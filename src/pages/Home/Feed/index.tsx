import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../../hooks";
import { RSS3Item } from "../../../models";

function Feed() {
  const { rss3, profile } = useUser();
  const [, setLoading] = useState(false);
  const [, setItems] = useState<RSS3Item[]>([]);

  if (! profile) {
    throw new Error('log in!');
  }

  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      // @todo pagination
      const list = await rss3.items.getList({ limit: 10, persona: profile.address });
      setItems(list);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [profile.address, rss3.items]);

  useEffect(() => void fetchFeed(), [fetchFeed]);

  return (
    <div>
      I am the feed
    </div>
  );
}

export default Feed;
