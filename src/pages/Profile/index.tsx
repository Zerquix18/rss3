import { useCallback, useEffect, useState } from "react";
import { Box } from "react-bulma-components";
import { useParams } from "react-router";
import { useUser } from "../../hooks";

function Profile() {
  const { rss3 } = useUser();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const profile = await rss3.profile.get(id);
      const list = await rss3.items.custom.getList(id!);

      console.log(list);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => void fetchProfile(), [fetchProfile]);

  return (
    <Box>
      I am the profile page
    </Box>
  );
}

export default Profile;
