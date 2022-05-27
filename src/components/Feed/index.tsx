import { LocalRSS3Item } from "../../models";
import FeedItem from "./FeedItem";

interface FeedProps {
  items: LocalRSS3Item[];
}

function Feed({ items }: FeedProps) {
  return (
    <div>
      { items.map(item => <FeedItem key={item.id} item={item} />)}
    </div>
  );
}

export default Feed;
