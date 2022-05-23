import { Box, Columns } from "react-bulma-components";
import { useUser } from "../../hooks";

import Feed from "./Feed";
import NewPost from "./NewPost";

function Home() {
  const { profile } = useUser();
  return (
    <Columns>
      <Columns.Column size="three-quarters">
        <Box>
          <NewPost />
          <hr />
          { profile && <Feed /> }
        </Box>
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
