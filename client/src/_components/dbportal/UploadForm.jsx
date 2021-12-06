import { useRecoilState } from 'recoil';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect} from 'react';
import { Upload, Button, message, Modal, Input, Tree } from 'antd';
import { UploadOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { nullableTypeAnnotation } from '@babel/types';
import { useFetchWrapper } from '_helpers';
import { Table, Tag, Space } from 'antd';
const { TextArea } = Input;


export { UploadForm };


function UploadForm(props) {
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [modalTitle, setModalTitle] = useState("Đang upload");
  const [log, setLog] = useState("Đang upload\n");
  const [result, setResult] = useState({
    registered: [],
    failed: []
  });

  const fetchWrapper = useFetchWrapper();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  async function handleUpload(){
    console.log(fileList);
    showModal();
    setLog("Đã bắt đầu upload");
    if (fileList){
      for (const file of fileList) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetchWrapper.post(props.formurl, null, formData);
        response.json().then(rawjson => { 
          if ("status" in rawjson) {
            if (rawjson.status === "Success"){
              setModalTitle("Upload thành công");
            } else (setModalTitle("Upload thất bại"));
            if ("registered" in rawjson.message) {
              setResult(rawjson.message);
            }
            setLog(log => {
              var newLog = log;
              var newRawJson = rawjson.message;
              newLog = JSON.stringify(newRawJson, null, 4);
              return newLog;
            });
            console.log(log);
          }
        });
      }    
    }
  };
const delError = (col) => {
  var abc = [...col]
  delete abc[col.length-1]
  return abc;
}
  const cprops = {
      // multiple:true,
      onRemove: file => {
        setFileList(fileList => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return newFileList;
        });
      },
      beforeUpload: file => {
        setFileList(fileList => ([...fileList, file]));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Modal title={modalTitle} visible={isModalVisible} onCancel= {handleOk} footer={[]}style={{ height: 700}} width={1000}>
          <CheckCircleTwoTone twoToneColor="#52c41a"style={{ fontSize: '15px', display: 'inline-block', verticalAlign: 'middle' }}/> Dữ liệu thêm thành công: <b>{result.registered.length}</b>
          <br/>
          <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '15px', display: 'inline-block', verticalAlign: 'middle' }}/> Dữ liệu thêm thất bại: <b>{result.failed.length}</b>
          <br/>
          <br/>
          {/* <Tree
            treeData={result}
          />            */}
          <b>Thành công:</b>
          {/* <TextArea rows={10} value = {log} style={{ resize: "none"}} /> */}
          {props.columns && <Table columns={delError(props.columns)} dataSource={result.registered} />}
          
          <b>Thất bại:</b>
          {/* <TextArea rows={10} value = {log} style={{ resize: "none"}} /> */}
          {props.columns && <Table columns={props.columns} dataSource={result.failed} />}
        </Modal>
        <Upload {...cprops}>
          <Button icon={<UploadOutlined /> } >Chọn file</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList?.length === 0}
          style={{ marginTop: 16 }}
        >
          Tải lên
        </Button>
      </div>
    );
  
}