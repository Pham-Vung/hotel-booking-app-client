import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Header from './Header';
import {
    FaClock,
    FaCocktail,
    FaParking,
    FaSnowflake,
    FaTshirt,
    FaUtensils,
    FaWifi
} from 'react-icons/fa';

const HotelService = () => {
    return (
        <>
            <Container className='mb-2'>
                <Header title={"Các dịch vụ của chúng tôi"} />
                <Row>
                    <h4 className='text-center'>
                        Các dịch vụ tại <span className='hotel-color'>Armani - </span>Hotel
                        <span className='gap-2'>
                            <FaClock /> - Quầy lễ tân 24 giờ
                        </span>
                    </h4>
                </Row>
                <hr />

                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaWifi /> Wifi
                                </Card.Title>
                                <Card.Text>Luôn kết nối truy cập internet tốc độ cao</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaUtensils /> Bữa sáng
                                </Card.Title>
                                <Card.Text>Bắt đầu ngày mới với bữa sáng tự chọn ngon miệng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaTshirt /> Giặt là
                                </Card.Title>
                                <Card.Text>Giữ quần áo của bạn sạch sẽ và thơm tho với dịch vụ giặt ủi của chúng tôi</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaCocktail /> Quầy bar nhỏ
                                </Card.Title>
                                <Card.Text>Thưởng thức đồ uống giải khát hoặc đồ ăn nhẹ từ quầy bar mini trong phòng của chúng tôi</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaParking /> Bãi đỗ xe
                                </Card.Title>
                                <Card.Text>Đỗ xe thuận tiện tại bãi đậu xe trong khuôn viên của chúng tôi</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaSnowflake /> Điều hòa không khí
                                </Card.Title>
                                <Card.Text>Luôn mát mẻ và thoải mái với hệ thống điều hòa không khí của chúng tôi</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HotelService;
