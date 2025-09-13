import { Form, Typography, DatePicker, Select, Button } from "antd";
import generateSlots from "../AvailableSlots/slot";

const DoctorAppointment = (chatId, slots) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  console.log("Chat ID:", chatId);
  console.log("Available Slots:", slots);

  const onChangeDate = (values) => {
    console.log("Form Values:", values);
    // Here you can handle form submission, e.g., send data to backend
    axios.get(`${process.env.REACT_APP_URL}/api/fetch-slots`, {
          chatId,
          ...values,
        }, { withCredentials: true })
        .then((response) => {
          console.log("Appointment booked successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error booking appointment:", error);
        });
  };


  // Booked slots
  const bookedSlots = [
    { time: "10:30 AM - 11:00 AM", isBooked: true },
    { time: "11:30 AM - 12:00 PM", isBooked: true },
  ];
  const allSlots = generateSlots(8, 22); // 8 AM to 10 PM

  // Mark booked slots
  const markBooked = (allSlots, bookedSlots) => {
    return allSlots.map((slot) => {
      const isBooked = bookedSlots.some((b) => b.time === slot.time);
      return { ...slot, isBooked };
    });
  };

  const finalSlots = markBooked(allSlots, bookedSlots);

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Here you can handle form submission, e.g., send data to backend
    axios.post(`${process.env.REACT_APP_URL}/api/book-appointment`, {
          chatId,
          ...values,
        },{ withCredentials: true })
        .then((response) => {
          console.log("Appointment booked successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error booking appointment:", error);
        });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title level={1}>Doctor Appointment</Typography.Title>
          <Typography.Text>Book your appointment with a doctor</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography.Text>
            Choose a date and time for your appointment
          </Typography.Text>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Date" name="date">
              <DatePicker onChange={(date, dateString) => onChangeDate(date, dateString)} />
            </Form.Item>
            <Form.Item
              label="Time Slot"
              name="time"
              rules={[{ required: true, message: "Please select a time slot" }]}
            >
              <Select placeholder="Select a time slot">
                {finalSlots.map((slot) => (
                  <Option
                    key={slot.time}
                    value={slot.time}
                    disabled={slot.isBooked}
                  >
                    {slot.time} {slot.isBooked ? "(Booked)" : ""}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary">
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Book Appointment
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default DoctorAppointment;

// {time: "10:00 AM - 10:30 AM", isBooked: false}

// const slots = [
//     { time: "10:00 AM - 10:30 AM", isBooked: false },
//     { time: "10:30 AM - 11:00 AM", isBooked: true },
//     { time: "11:00 AM - 11:30 AM", isBooked: false },
//     { time: "11:30 AM - 12:00 PM", isBooked: true },
//   ];

//  const slots = [
//     { time: "10:30 AM - 11:00 AM", isBooked: true },
//     { time: "11:30 AM - 12:00 PM", isBooked: true },
//   ];

// time hoga = 8 am to 10 pm
