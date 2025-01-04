import moment from 'moment';
import React, { useState } from 'react';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import RoomTypeSelector from './RoomTypeSelector';
import RoomSearchResult from './RoomSearchResult';

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (!checkIn.isValid() || !checkOut.isValid()) {
      setErrorMessage("Vui lòng chọn khoảng ngày");
      return;
    }
    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMessage("Ngày trả phòng phải nằm sau ngày nhận phòng");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
      .then(response => {
        setAvailableRooms(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (checkIn.isValid() && checkOut.isValid()) {
      setErrorMessage("");
    }
  }

  const clearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: ""
    });
    setAvailableRooms([]);
  }
  return (
    <>
      <Container className='shadow mb-5 py-5'>
        <Form onSubmit={handleSearch}>
          <Row className='justify-content-center'>
            <Col xs={12} md={3}>
              <Form.Group controlId='checkInDate'>
                <Form.Label>Ngày nhận phòng</Form.Label>
                <Form.Control
                  type='date'
                  name='checkInDate'
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId='checkOutDate'>
                <Form.Label>Ngày trả phòng</Form.Label>
                <Form.Control
                  type='date'
                  name='checkOutDate'
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId='roomType'>
                <Form.Label>Kiểu phòng</Form.Label>
                <div className="d-flex gap-1">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                    className="w-75"
                  />
                  <Button variant="secondary" type="submit">
                    Tìm kiếm
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {isLoading ? (
          <p className='mt-4'>Đang tìm các phòng có sẵn...</p>
        ) : availableRooms ? (
          <RoomSearchResult results={availableRooms} onClearSearch={clearSearch} />
        ) : (
          <p className='mt-4'>Không có phòng trống cho ngày và loại phòng đã chọn</p>
        )}

        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      </Container>
    </>
  )
}

export default RoomSearch;
