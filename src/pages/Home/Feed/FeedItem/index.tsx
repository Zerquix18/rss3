import { Card, Media, Image, Heading, Content, Tag } from "react-bulma-components";
import { useUser } from "../../../../hooks";
import { RSS3Item } from "../../../../models";

interface FeedItemProps {
  item: RSS3Item;
}

function FeedItem({ item }: FeedItemProps) {
  const { profile } = useUser();
  if (! profile) {
    throw new Error('');
  }

  return (
    <Card>
      <Card.Content>
        <Media>
          <Media.Item renderAs="figure" align="left">
            <Image rounded size={48} alt="48x48" src={profile.avatar} />
          </Media.Item>
          <Media.Item>
            <Heading size={4}>{ profile.name }</Heading>
            <Heading subtitle size={6}>
              <Tag>{ profile.address }</Tag>
              </Heading>
          </Media.Item>
        </Media>
        <Content>
          { item.title ? <Heading size={5}>{ item.title }</Heading> : null }
          { item.summary }
        </Content>
      </Card.Content>
    </Card>
  );
}

export default FeedItem;
