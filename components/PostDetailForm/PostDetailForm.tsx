import { useRef } from "react";

type PostDetailFormProps = {
  url_image: string;
  post_content: string;
  obj_image: {
    file: File | null;
    base64: string;
  }
  onChangeDetailForm: (key: string, value: any) => void;
}

const PostDetailForm: React.FC<PostDetailFormProps> = ({
  url_image,
  post_content,
  obj_image,
  onChangeDetailForm
}) => {

  const inputFileEl = useRef(null);

  const handleOnChange = (key: string) => (e) => {
    const value = e.target.value;
    onChangeDetailForm(key, value);
  }

  const handleChangeFile = (e) => {
    // Không cho phép chọn nhiều file
    const listFiles = e.target.files;
    if (listFiles.length === 0) return;
    const file = listFiles[0] as File;
    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          onChangeDetailForm('obj_image', {
            file,
            base64: reader.result as string,
          })
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      alert("File không hợp lệ");
    }
  };

  const imgUrl = url_image || obj_image.base64 || "/images/no_image_available.jpg";

  const handleClickSelectFile = () => {
    inputFileEl.current.click();
  };
  return (
    <div className="ass1-section ass1-section__edit-post">
      <div className="ass1-section__content">
        <form action="#">
          <div className="form-group">
            <input
              value={url_image}
              onChange={handleOnChange('url_image')}
              type="text"
              className="form-control ttg-border-none"
              placeholder="https://"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control ttg-border-none"
              placeholder="Mô tả ..."
              onChange={handleOnChange('post_content')}
              value={post_content}
            />
          </div>
        </form>
        <input
          ref={inputFileEl}
          style={{ display: "none" }}
          type="file"
          onChange={handleChangeFile}
        />
        <div className="ass1-section__image">
          <a href="#"><img src={imgUrl} alt="default" /></a>
        </div>
        <a href="https://memeful.com/" target="_blank" className="ass1-btn ass1-btn-meme">Chế ảnh từ
          meme</a>
        <button onClick={handleClickSelectFile} className="ass1-btn ass1-btn-meme" type="button">
          Đăng ảnh từ máy tính
        </button>
      </div>
    </div>
  )
}

export default PostDetailForm;