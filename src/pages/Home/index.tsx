import { useCallback, useEffect, useState } from "react";
import { Box, Columns, Progress } from "react-bulma-components";
import { useUser } from "../../hooks";
import { LocalRSS3Item, RSS3Item } from "../../models";

import Feed from "../../components/Feed";
import NewPost from "./NewPost";

function Home() {
  const { profile, rss3 } = useUser();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<LocalRSS3Item[]>([]);

  const fetchFeed = useCallback(async () => {
    if (! profile) {
      return;
    }

    try {
      setLoading(true);
      // @todo pagination
      const list = (await rss3.items.getList({ limit: 10, persona: profile.address })) as RSS3Item[];
      const localItems: LocalRSS3Item[] = list.map(item => ({ ...item, profile }));
      setItems(localItems);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [profile, rss3.items]);

  useEffect(() => void fetchFeed(), [fetchFeed]);

  return (
    <Columns>
      <Columns.Column size="three-quarters">
        { profile && (
          <Box>
            <NewPost />
            <hr />
            { loading && <Progress /> }
            { items.length > 0 && <Feed items={items} /> }
          </Box>
        )}
      </Columns.Column>
      <Columns.Column>
        <Box>
          I am some sidebar.
        </Box>
      </Columns.Column>
    </Columns>
  );
}

export default Home;
