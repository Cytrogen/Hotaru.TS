import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FriendsTabBar from "./Friends_Tab_Bar";
import ActiveFriendsList from "./Active_Friends_List";
import ActiveEventsSection from "./Active_Events_Section";
import FriendsListSideBar from "../private_message_common/Friends_List_Sidebar";

interface PrivateMessageHomepageProps {
  style: React.CSSProperties;
}

const PrivateMessageHomepage: React.FC<PrivateMessageHomepageProps> = ({ style }) => {
  return (
    <>
      <FriendsListSideBar />
      <Container fluid className="mx-0">
        <Row xs="1">
          <Col className="d-flex flex-row justify-content-between" style={{ height: '48px', padding: '8px', fontSize: '16px', borderBottom: 'solid 3px rgba(45, 47, 52)' }}>
            <FriendsTabBar />
          </Col>

          <Col className="d-flex flex-row">
            <ActiveFriendsList />
            <ActiveEventsSection />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PrivateMessageHomepage;
