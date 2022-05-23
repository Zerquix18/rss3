import { useCallback, useEffect, useState } from "react";
import { Progress } from "react-bulma-components";
import { useUser } from "../../../hooks";
import { RSS3Item } from "../../../models";
import FeedItem from "./FeedItem";

function Feed() {
  const { rss3, profile } = useUser();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<RSS3Item[]>([]);

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

  if (loading) {
    return <Progress />
  }

  return (
    <div>
      { items.map(item => <FeedItem key={item.id} item={item} />)}
    </div>
  );
}

export default Feed;
