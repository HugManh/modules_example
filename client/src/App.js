import { Button, Spin, Upload, message } from "antd"
import "antd/dist/reset.css"
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import './gallery.css'

function App() {

  const [allImage, setAllImage] = useState()

  useEffect(() => {
    getImage()
  }, [])

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/v1/images")
      console.log(result);
      setAllImage(result.data.data)
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        <Upload.Dragger
          // multiple
          listType="picture"
          action={"http://localhost:3000/upload"}
          showUploadList={{ showRemoveIcon: true }}
          accept=".png,.jpeg,.doc"
          beforeUpload={(file) => {
            console.log({ file });
            return true;
          }}
          onChange={(file) => {
            const { status } = file.file;
            if (status !== 'uploading') {
              console.log(file.file, file.fileList);
            }

            if (status === 'done') {
              message.success(`${file.file.name} file uploaded successfully.`);
              getImage()
            } else if (status === 'error') {
              message.error(`${file.file.name} file upload failed.`);
            }
          }}
          // defaultFileList={[
          //   {
          //     uid: "abc",
          //     name: "abc",
          //     status: "uploading",
          //     percent: 50,
          //     url: "https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/356086283_235223269290170_8780881540057273562_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=xMonJAiP9WYAX8Khfc8&_nc_ht=scontent.fhan4-2.fna&oh=00_AfBT4t2IyU-4XqPiu2V0w7skORG-GpA4wnXgTmX2zBXQIQ&oe=64B7BF09"
          //   }
          // ]}
          iconRender={() => {
            return <Spin></Spin>
          }}
          progress={{
            size: "small",
            strokeColor: {
              "0%": "#f0f",
              "100%": "#ff0"
            },
            style: { top: 12 }
          }}
        >
          Drag files here OR
          <br />
          <Button>Click Upload</Button>
        </Upload.Dragger>
      </div >
      <div className="gallery">
        {allImage == null
          ? ""
          : allImage.map((data, index) => {
            return (
              <div className="pics" key={index}>
                <img src={data} alt="image" style={{ width: '100%' }} />
              </div>
            )
          })}
      </div>
    </>
  );
}

export default App;
