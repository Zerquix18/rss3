import { Card, Media, Image, Heading, Content, Tag } from "react-bulma-components";
import { LocalRSS3Item } from "../../../models";

interface FeedItemProps {
  item: LocalRSS3Item;
}

function FeedItem({ item }: FeedItemProps) {
  return (
    <Card>
      <Card.Content>
        <Media>
          <Media.Item renderAs="figure" align="left">
            <Image rounded size={48} alt="48x48" src={item.profile.avatar} />
          </Media.Item>
          <Media.Item>
            <Heading size={4}>{ item.profile.name }</Heading>
            <Heading subtitle size={6}>
              <Tag>{ item.profile.address }</Tag>
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
