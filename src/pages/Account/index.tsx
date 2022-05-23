import { useEffect, useMemo, useState } from "react";
import { Box, Button, Columns, Form, Heading, Icon, Notification } from "react-bulma-components";
import { useUser } from "../../hooks";
import { APIResponse } from "../../models";
import { parseBio } from "../../utils";

function Account() {
  const { profile, rss3 } = useUser();

  const bioInfo = useMemo(() => parseBio(profile ? profile.bio : ''), [profile]);

  const [name, setName] = useState(profile ? profile.name : '');
  const [bio, setBio] = useState(bioInfo.actualBio);
  const [url, setUrl] = useState(bioInfo.url);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<APIResponse | null>(null);

  useEffect(() => {
    // till I solve the state problem
    setName(profile ? profile.name : '');
    setBio(bioInfo.actualBio);
    setUrl(bioInfo.url);
  }, [bioInfo, profile]);

  const onSubmit = async () => {
    const newBio = `${bio}<SITE#${url}>`;

    try {
      setLoading(true);
      await rss3.profile.patch({ name, bio: newBio });
      await rss3.files.sync();
      setResponse({ success: true, response: 'Successfully updated your profile.' });
    } catch (e) {
      console.log(e);
      setResponse({ success: false, response: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  if (! profile) {
    return (
      <div>You need to be logged in.</div>
    );
  }

  return (
    <Box>
      <Heading size={3}>My Account</Heading>
      <Columns>
        <Columns.Column size="one-third" offset="one-third">
          <form>
            { response && (
              <Notification color={response.success ? 'success' : 'danger'}>
                <Button
                  remove
                  onClick={() => {
                    setResponse(null);
                  }}
                />
                { response.response }
              </Notification>
            )}
            <Form.Field>
              <Form.Label>Name</Form.Label>
                <Form.Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
            </Form.Field>
            <Form.Field>
              <Form.Label>Site</Form.Label>
              <Form.Control>
                <Form.Input
                  style={{ paddingLeft: '4rem' }}
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                />
                <Icon align="left" style={{ left: 15 }}>
                  https://
                </Icon>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Bio</Form.Label>
              <Form.Textarea
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </Form.Field>
            <div className="has-text-centered">
              <Button color="info" disabled={loading} onClick={onSubmit}>
                Update profile
              </Button>
            </div>
          </form>
        </Columns.Column>
      </Columns>
    </Box>
  );
}

export default Account;
