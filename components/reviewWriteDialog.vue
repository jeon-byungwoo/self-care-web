<template>
  <div class="background">
    <div class="window">
      <div class="popup">
        <div class="title-close-area">
          <div class="title-text">리뷰 쓰기</div>
          <img
            class="close-btn"
            draggable="false"
            src="@/assets/image/ic_dialog_close.png"
            @click="closeAction"
          />
        </div>

        <div class="remains-area">
          <div class="rating-text">별점을 선택 해주세요.</div>
          <div class="rating-group">
            <img
              class="rating-img"
              :src="
                rating >= 1
                  ? require('@/assets/image/ic_star.png')
                  : require('@/assets/image/ic_gray_star.png')
              "
              @click="rating = 1"
              draggable="false"
            />
            <img
              class="rating-img"
              :src="
                rating >= 2
                  ? require('@/assets/image/ic_star.png')
                  : require('@/assets/image/ic_gray_star.png')
              "
              @click="rating = 2"
              draggable="false"
            />
            <img
              class="rating-img"
              :src="
                rating >= 3
                  ? require('@/assets/image/ic_star.png')
                  : require('@/assets/image/ic_gray_star.png')
              "
              @click="rating = 3"
              draggable="false"
            />
            <img
              class="rating-img"
              :src="
                rating >= 4
                  ? require('@/assets/image/ic_star.png')
                  : require('@/assets/image/ic_gray_star.png')
              "
              @click="rating = 4"
              draggable="false"
            />
            <img
              class="rating-img"
              :src="
                rating >= 5
                  ? require('@/assets/image/ic_star.png')
                  : require('@/assets/image/ic_gray_star.png')
              "
              @click="rating = 5"
              draggable="false"
            />
          </div>

          <div class="review-contents-text">리뷰 내용을 작성 해주세요.</div>
          <div class="pw-area">
            <textarea
              v-model="nowPw"
              class="pw"
              type="text"
              placeholder="리뷰 내용을 작성해주세요."
            ></textarea>
          </div>

          <div class="image-upload-text">
            상품과 관련된 사진을 업로드 해주세요.
          </div>
          <div class="image-upload-area">
            <form
              method="post"
              enctype="multipart/form-data"
              class="form-style"
            >
              <label for="chooseFile">
                <div class="image-upload" :style="'cursor: pointer'">
                  <img
                    class="select-image"
                    src="@/assets/image/photo_camera_back.png"
                    draggable="false"
                  />
                </div>
              </label>
              <input
                multiple
                @change="imageUpload()"
                ref="images"
                type="file"
                id="chooseFile"
              />
            </form>

            <div v-for="(item, i) in imageList" :key="i" class="image-upload">
              <img
                class="image-upload-img"
                :src="item.imageUploaded"
                draggable="false"
              />
              <img
                class="image-delete-img"
                draggable="false"
                src="@/assets/image/ic_dialog_close.png"
                @click="imageDelete(i)"
              />
            </div>
          </div>

          <div class="btn-area">
            <div class="cancel-btn" @click="closeAction">취소</div>
            <div class="done-btn" @click="sendData">확인</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'howToView',
  data() {
    return {
      nowPw: '',
      newPw: '',
      confirmPw: '',
      rating: 0,
      imageList: [],
    }
  },
  methods: {
    preClick() {},
    closeAction() {
      this.$emit('closeAction', true)
    },
    sendData() {
      this.$emit('sendData', this.nowPw, this.newPw, this.confirmPw)
      //   console.log(this.nowPw, this.newPw, this.confirmPw)
    },
    imageUpload() {
      for (let i = 0; i < this.$refs.images.files.length; i++) {
        let obj = {
          image: this.$refs.images.files[i],
          imageUploaded: URL.createObjectURL(this.$refs.images.files[i]),
        }
        this.imageList.push(obj)
      }
      console.log(this.imageList.length)
    },
    imageDelete(index) {
      let result = this.imageList.filter((item, i) => i != index)
      this.imageList = result
    },
    submitPost() {
      // 원래 있던 dto랑 이미지를 UserFormData에 넣어서 axios로 보내야함

      // const vm = this
      const userPK = this.$store.state.loginStore.id

      const dto = {
        date: this.date,
        routine: this.content,
      }
      // 먼저 dto를 blob으로 바꿈
      const dtoToBlob = new Blob([JSON.stringify(dto)], {
        type: 'application/json',
      })

      // FormData를 만듬
      var formData = new FormData()

      // blob으로 바꾼 dto랑 사용자가 입력한 이미지 formData에 append함
      formData.append('routineDTO', dtoToBlob)
      formData.append('image', this.image)

      const config = {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.loginStore.token,
          'Content-Type': 'multipart/form-data', // 컨텐츠 타입 지정해줘야함
        },
      }
      axios
        .post('http://localhost:8081/routine/' + userPK, formData, config)
        .then((res) => {
          alert('생성 완료')
          console.log(res.data)
          document.location = 'http://localhost:8080/myPage'
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
.window {
  position: relative;
  width: 100%;
  height: 100%;
}
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

  /* 임시 지정 */
  width: 700px;
  height: auto;
  border-radius: 30px;
  .title-close-area {
    display: flex;
    align-items: center;
    padding: 0px 30px;
    height: 100px;
    background-color: #fff;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    .title-text {
      flex: 1;
      font-size: 28px;
      font-family: 'score8';
      color: #333;
    }
    .close-btn {
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }
  #chooseFile {
    visibility: hidden;
  }
  .remains-area {
    height: auto;
    padding: 40px 40px 50px 40px;
    background-color: #f6f6f6;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;

    .rating-text {
      color: #333;
      font-size: 18px;
      font-family: 'score5';
    }
    .rating-group {
      display: flex;
      margin-top: 18px;
      * + * {
        margin-left: 10px;
      }
      .rating-img {
        width: 32px;
        height: 32px;
        cursor: pointer;
      }
    }
    .review-contents-text {
      color: #333;
      font-size: 18px;
      font-family: 'score5';
      margin-top: 30px;
    }
    .pw-area {
      margin-top: 20px;
      width: 100%;
      height: 200px;
      display: flex;
    }
    .pw {
      width: 100%;
      height: 200px;
      vertical-align: top;
      text-align: start;
      border: 1px solid #dddddd;
      background-color: #fff;
      color: #333;
      letter-spacing: -0.6px;
      border-radius: 1px;
      font-size: 16px;
      font-family: 'score2';
      padding: 12px;
      word-wrap: break-word;
      word-break: break-word;
    }
    .image-upload-text {
      color: #333;
      font-size: 18px;
      font-family: 'score5';
      margin-top: 30px;
    }
    .image-upload-area {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      * + * {
        margin-left: 0px;
      }
      .form-style {
        width: 100px;
        height: 100px;
      }
      .image-upload {
        width: 100px;
        height: 100px;
        background-color: #fff;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .image-area {
          width: 100px;
          height: 100px;
          background-color: #fff;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-upload-img {
          width: 100px;
          height: 100px;
        }
        .select-image {
          width: 44px;
          height: 44px;
        }
        .image-delete-img {
          position: absolute;
          width: 24px;
          height: 24px;
          top: 4px;
          right: 4px;
        }
      }
    }
    .btn-area {
      display: flex;
      margin-top: 50px;
      .cancel-btn {
        flex: 1;
        border: 1px solid #ddd;
        background-color: #fff;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #333;
        font-size: 18px;
        font-family: 'score5';
      }
      .done-btn {
        flex: 1;
        background-color: #9ad144;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        font-family: 'score5';
      }
    }
  }
}
@media (max-width: 720px) {
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }
  .window {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .popup {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

    /* 임시 지정 */
    width: 90%;
    height: auto;
    border-radius: 30px;
    .title-close-area {
      display: flex;
      align-items: center;
      padding: 0px 20px;
      height: 50px;
      background-color: #fff;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px;
      .title-text {
        flex: 1;
        font-size: 22px;
        font-family: 'score8';
        color: #333;
      }
      .close-btn {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
    #chooseFile {
      visibility: hidden;
    }
    .remains-area {
      height: auto;
      padding: 20px;
      background-color: #f6f6f6;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;

      .rating-text {
        color: #333;
        font-size: 16px;
        font-family: 'score5';
      }
      .rating-group {
        display: flex;
        margin-top: 16px;
        * + * {
          margin-left: 8px;
        }
        .rating-img {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
      .review-contents-text {
        color: #333;
        font-size: 16px;
        font-family: 'score5';
        margin-top: 28px;
      }
      .pw-area {
        margin-top: 18px;
        width: 100%;
        height: auto;
        display: flex;
      }
      .pw {
        width: 100%;
        height: 20vh;
        vertical-align: top;
        text-align: start;
        border: 1px solid #dddddd;
        background-color: #fff;
        color: #333;
        letter-spacing: -0.6px;
        border-radius: 1px;
        font-size: 14px;
        font-family: 'score2';
        padding: 12px;
        word-wrap: break-word;
        word-break: break-word;
      }
      .image-upload-text {
        color: #333;
        font-size: 16px;
        font-family: 'score5';
        margin-top: 20px;
      }
      .image-upload-area {
        margin-top: 18px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        * + * {
          margin-left: 0px;
        }
        .form-style {
          width: 50px;
          height: 50px;
        }
        .image-upload {
          width: 50px;
          height: 50px;
          background-color: #fff;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          .image-area {
            width: 50px;
            height: 50px;
            background-color: #fff;
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .image-upload-img {
            width: 50px;
            height: 50px;
          }
          .select-image {
            width: 40px;
            height: 40px;
          }
          .image-delete-img {
            position: absolute;
            width: 20px;
            height: 20px;
            top: 4px;
            right: 4px;
          }
        }
      }
      .btn-area {
        display: flex;
        margin-top: 30px;
        .cancel-btn {
          flex: 1;
          border: 1px solid #ddd;
          background-color: #fff;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          font-size: 18px;
          font-family: 'score5';
        }
        .done-btn {
          flex: 1;
          background-color: #9ad144;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
          cursor: pointer;
          color: #fff;
          font-size: 18px;
          font-family: 'score5';
        }
      }
    }
  }
}
</style>
