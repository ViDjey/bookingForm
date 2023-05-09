import { useRef, useState } from "react"
import { Select, DatePicker, TimePicker, Form, Button, message } from "antd"
import dayjs from "dayjs"
const { Option } = Select

export default function BookingForm(){
    const [comment, setComment] = useState('')
    
    const formRef = useRef(null)

    const onChangeTextArea = (e) => {
        setComment(e.target.value)
    }

    const disabledDate = (current) => current && current.diff(dayjs().endOf('day'), 'days') < 0

    const onReset = () => {
        formRef.current?.resetFields()
        setComment('')
    }

    const onFinish = (values) => {
        message.success("Форма отправлена")
        console.log(
            JSON.stringify({
                tower: values.tower,
                floor: values.floor,
                meetingRoom: values.meetingRoom,
                comment: comment,
                date: values.date.$d.toLocaleDateString(),
                beginTime: values.time[0].$d.toLocaleTimeString(),
                endTime: values.time[1].$d.toLocaleTimeString()
            })
        )
        onReset()
    }

    return (
        <Form ref={formRef} className="sendForm" onFinish={ onFinish }>
            <Form.Item name="tower" label="Выберите башню:"
                rules={[ { required: true } ]}>
                <Select options={[
                    { value: 'A', label: 'A' },
                    { value: 'B', label: 'B' }]}
                />
            </Form.Item>
            <Form.Item name="meetingRoom" label="Выберите этаж:"
                rules={[{ required: true }]}>
                <Select>
                    { Array.from({ length: 25 }, (_, i) => i + 3).map((num) => (
                        <Option key = { num } value = { num }>{ num }</Option>
                ))}
                </Select>
            </Form.Item>
            <Form.Item name="floor" label="Выберите переговорную:"
                rules={[{ required: true }]}>
                <Select>
                    { Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <Option key = { num } value = { num }>{ num }</Option>
                ))}
                </Select>
            </Form.Item>
            <Form.Item name="date" label="Выберите дату:"
                rules={[{ required: true }]}>
                <DatePicker disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item name="time" label="Выберите время:"
                rules={[{ required: true }]}>
                <TimePicker.RangePicker format='HH:mm'/>
            </Form.Item>
            <Form.Item>
                <textarea className="comment" value={ comment } onChange={ onChangeTextArea } placeholder="Комментарий:" />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Отправить</Button>
                <Button htmlType="button" className="buttonReset" onClick={ onReset }>Очистить</Button>
            </Form.Item>
        </Form>
    )
}
