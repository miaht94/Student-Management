import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Divider, Select} from 'antd';
import { useClassWrapper, useFetchWrapper } from '_helpers';

const {Option} = Select;

export {DownloadForm} 

function DownloadForm(props) {
    const [semesterData, setSemesterData] = useState([]);
    const [semFilterState, setSemFilterState] = useState(null);
    const fetchWrapper = useFetchWrapper();
    

    const [form] = Form.useForm();

    useEffect(() =>{
      console.log("Reconstruct GPADash")

      async function getSemesterData(){
          var tempSem = [];
          let response = await fetchWrapper.get("http://localhost:3000/api/semesters/all", null, null);
          response = await response.json();
          console.log(response);
          if (response?.status === "Success"){
              for (const object of response.message ) {
                  tempSem.push({
                      label: object.semester_name,
                      value: object.semester_id
                  })
              }
              setSemesterData(tempSem);
              if (tempSem.length>0){
                setSemFilterState(tempSem[0]);
              }
              
          }
      }

      async function initDownloadForm(){
        await getSemesterData();
      }
      initDownloadForm();
    }, [props]);

    function handleSemFilterChange(value) {
      setSemFilterState(value);
      console.log(semFilterState);
    }

    function handleSubmit() {
        form.validateFields()
        .then((values) => {
            console.log(props.classId)
            console.log(values.semesterId);
            var generated = "http://localhost:8081/api/scores/download/" + props.classId + "/" + values.semesterId;
            openInNewTab(generated);
        })
    };

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div>
            <h6> Nh???p m?? k?? h???c </h6>
            <Form
                form = {form}
                layout="vertical"
                name="downloadform"
                initialValues={{
                    modifier: 'public',
                }}
            >
          <Form.Item
            name="semesterId"
            label="M?? k?? h???c:"
          >
            <Select defaultValue={semFilterState} style={{ width: 180 }} onChange={handleSemFilterChange} >
                            {semesterData.map(({ label, value }) => (
                                <option key={value} value={value}>
                                    { label}
                                </option>
              ))}
            </Select>
          </Form.Item>
          {/* <p>Th??m nhi???u sinh vi??n c??ch nhau b???ng d???u ',' </p>
          <p>Sinh vi??n ???????c th??m v??o l???p ph???i c?? t??i kho???n VNU ???????c c???p b???i admin c???a h??? th???ng. </p> */}
          <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick = {handleSubmit}>
                            T???i b???ng ??i???m c???a k?? h???c
                        </Button>
                    </Form.Item>
        </Form>
        </div>
        
    )
}