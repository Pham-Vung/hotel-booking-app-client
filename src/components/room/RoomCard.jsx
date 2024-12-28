import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    return (
        <Col key={room.id} className='mb-4' xs={12}>
            <Card>
                <Card.Body className='d-flex flex-wrap align-items-center'>
                    <div className='flex-shrink-0 me-3 mb-3 mb-md-0'>
                        <Card.Img
                            variant='top'
                            src={`data:image/png;base64, ${room.photo}`}
                            alt='Ảnh phòng'
                            className='rounded'
                            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                        />
                    </div>
                    <div className='flex-grow-1 ms-3 px-5'>
                        <Card.Title style={{ color: "rgb(169, 77, 123)" }}>{room.roomType}</Card.Title>
                        <Card.Title style={{
                            color: "rgb(184, 134, 11)",
                            fontFamily: "'Courier New', Courier, monospace",
                            fontSize: "medium",
                        }}>{room.roomPrice} / đêm</Card.Title>
                        <Card.Text>Một số thông tin phòng để ở đây để khách đọc qua</Card.Text>
                    </div>
                    <div className='flex-shrink-0 mt-3'>
                        <Link to={`bookings/${room.id}`} className='btn btn-secondary btn-sm'>
                            Xem/Đặt phòng ngay
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default RoomCard;
