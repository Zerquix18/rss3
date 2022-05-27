import { useCallback, useEffect, useState } from "react";
import { Block, Box, Columns, Content, Heading, Image, Progress, Tag } from "react-bulma-components";
import { useParams } from "react-router";
import Feed from "../../components/Feed";
import { useUser } from "../../hooks";
import { LocalRSS3Item, Profile as ProfileType, RSS3Item } from "../../models";
import { getProfile } from "../../utils";

type RetrievedProfile = {
  details: ProfileType;
  list: LocalRSS3Item[];
}

function Profile() {
  const { rss3 } = useUser();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<RetrievedProfile | null>(null);
  
  const fetchProfile = useCallback(async () => {
    if (! id) {
      throw new Error('Profile id is missing.');
    }

    try {
      setLoading(true);

      const profileInfo = await rss3.profile.get(id);
      const list = (await rss3.items.custom.getList(id)) as RSS3Item[];
      const details = getProfile(id, profileInfo);

      const localItems: LocalRSS3Item[] = list.map(item => ({ ...item, profile: details }));

      setProfile({ details, list: localItems });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => void fetchProfile(), [fetchProfile]);

  if (loading) {
    return <Progress />
  }

  if (! profile) {
    return <p>This profile does not exist.</p>;
  }

  return (
    <Box>
      <Columns>
        <Columns.Column size="one-third" offset="one-third">
          <Box>
            <Block className="has-text-centered">
              <Image rounded size={64} src={profile.details.avatar} style={{ margin: '20px auto'}} />
              <Heading size={3}>{ profile.details.name }</Heading>
              { profile.details.url && (
                <Tag>{ profile.details.url }</Tag>
              )}
              <Content>{ profile.details.bio }</Content>
            </Block>
          </Box>
        </Columns.Column>
      </Columns>

      <hr />

      <Feed items={profile.list} />
    </Box>
  );
}

export default Profile;
