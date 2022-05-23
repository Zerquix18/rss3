import { useState } from "react";
import { Box, Button, Form, Heading, Notification } from "react-bulma-components";
import { useUser } from "../../../hooks";
import { APIResponse } from "../../../models";

function NewPost() {
  const { rss3 } = useUser();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<APIResponse | null>(null);

  const onSubmit = async () => {
    try {
      setResponse(null);
      setLoading(true);
      await rss3.items.custom.post({ title, summary });
      await rss3.files.sync();
      setResponse({ success: true, response: 'Successfully added a new post.' });
      setTitle('');
      setSummary('');
    } catch (e) {
      console.log(e);
      setResponse({ success: false, response: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = title || summary;

  return (
    <Box>
      <Heading size={3}>New Post</Heading>

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
          <Form.Label>Title</Form.Label>
          <Form.Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Summary</Form.Label>
          <Form.Textarea
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
        </Form.Field>
        <div className="has-text-right">
          <Button color="info" loading={loading} disabled={loading || ! canSubmit} onClick={onSubmit}>
            Add
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default NewPost;
