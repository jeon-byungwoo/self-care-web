<template>
  <div class="background">
    <div class="window">
      <div class="popup">
        <div class="top-area">
          <div class="first-title-area">
            <div class="green-text">
              펫보험은
              <div class="basic-text">
                은 우리아이들을 지키는<br />
                <div class="bold-text">
                  필수적 선택
                  <div class="basic-text">입니다.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="sub-title-text">
            어느 날 나에게 따뜻한 선물로 찾아온 우리 아이들<br />오래오래 우리와
            함께 하기를
          </div>
          <img
            class="close-btn"
            draggable="false"
            src="@/assets/image/ic_dialog_close.png"
            @click="closeAction"
          />
        </div>

        <div class="remains-area">
          <div class="left-area">
            <div class="title-text">·&nbsp;어떤 반려동물인가요?</div>
            <div class="radio-area">
              <div class="pet-select-radio-area" @click="selectedPet = 1">
                <img
                  class="radio-img"
                  :src="
                    selectedPet == 1
                      ? require('@/assets/image/ic_radio_on.png')
                      : require('@/assets/image/ic_radio_off.png')
                  "
                  draggable="false"
                />
                <div>
                  <img
                    class="pet-img"
                    src="@/assets/image/img_dog.png"
                    draggable="false"
                  />
                  <div class="pet-text">강아지</div>
                </div>
              </div>

              <div class="pet-select-radio-area" @click="selectedPet = 2">
                <img
                  class="radio-img"
                  :src="
                    selectedPet == 2
                      ? require('@/assets/image/ic_radio_on.png')
                      : require('@/assets/image/ic_radio_off.png')
                  "
                  draggable="false"
                />
                <div>
                  <img
                    class="pet-img"
                    src="@/assets/image/img_cat.png"
                    draggable="false"
                  />
                  <div class="pet-text">고양이</div>
                </div>
              </div>
            </div>
            <div class="title-text">·&nbsp;품종 및 이름을 입력해주세요.</div>
            <input class="input-form" placeholder="로이/푸들" />
            <div class="title-text">·&nbsp;성별을 선택 해 주세요.</div>
            <div class="gender-select-area">
              <div
                :class="
                  selectedGender == 1 ? 'gender-select' : 'gender-not-select'
                "
              >
                남
              </div>
              <div
                :class="
                  selectedGender == 2 ? 'gender-select' : 'gender-not-select'
                "
              >
                여
              </div>
            </div>
            <div class="title-text">
              ·&nbsp;아이가 태어난 날짜를 알려주세요.
            </div>
            <input class="input-form" placeholder="출생 일자(200101)" />
          </div>
          <div class="right-area">
            <div class="bg-area">
              <div class="title-text">·&nbsp;거주 지역을 선택해주세요.</div>
              <div class="input-half-group">
                <div class="coalition-area">
                  <select>
                    <option value="" selected disabled>시/도</option>
                    <option>가</option>
                    <option>나</option>
                  </select>
                  <img
                    class="right-arrow"
                    src="@/assets/image/ic_down_arrow.png"
                  />
                </div>
                <div class="coalition-area">
                  <select>
                    <!-- <optgroup label="군/구"> -->
                    <option value="" selected disabled>군/구</option>
                    <option>가</option>
                    <option>나</option>
                    <!-- </optgroup> -->
                  </select>
                  <img
                    class="right-arrow"
                    src="@/assets/image/ic_down_arrow.png"
                  />
                </div>
              </div>
              <div class="title-text">·&nbsp;보호자명</div>
              <input class="input-form" placeholder="성명" />
              <div class="title-text">·&nbsp;보호자 연락처</div>
              <input class="input-form" placeholder="연락처('-'없이 입력)" />
            </div>

            <div class="insurance-btn" @click="sendData">문의하기</div>
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
      selectedPet: 1,
      selectedGender: 1,
    }
  },
  methods: {
    preClick() {},
    petSelect() {
      console.log('click')
    },
    closeAction() {
      this.$emit('closeAction', true)
    },
    sendData() {
      this.$emit('sendData')
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
  width: 720px;
  border-radius: 30px;
}

.top-area {
  width: 100%;
  height: 230px;
  background: url('@/assets/image/img_pet_bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .first-title-area {
    display: flex;
    align-items: center;
    justify-content: center;
    .green-text {
      color: #9ad144;
      font-size: 30px;
      font-family: 'score7';
      display: flex;
    }
    .basic-text {
      color: #fff;
      font-size: 30px;
      font-family: 'score2';
    }
    .bold-text {
      color: #fff;
      font-size: 30px;
      font-family: 'score6';
      display: flex;
    }
  }
  .sub-title-text {
    margin-top: 13px;
    color: #fff;
    font-size: 16px;
    font-family: 'score2';
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 45px;
    height: 45px;
    margin-top: 20px;
    margin-right: 20px;
    cursor: pointer;
  }
}

.remains-area {
  padding: 20px;
  display: flex;
  .title-text {
    color: #555;
    font-size: 16px;
    font-family: 'score6';
    margin-top: 20px;
  }
  .input-form {
    border: 1px solid #ddd;
    background-color: #fff;
    flex: 1;
    width: 100%;
    height: 40px;
    padding: 20px;
    color: #000;
    font-size: 16px;
    font-family: 'score2';
    outline: none;
    margin-top: 20px;
  }
  .left-area {
    flex: 1;
    background-color: #f8f8f8;
    border: 1px solid #eaeaea;
    padding: 0px 20px 20px 20px;
    .radio-area {
      margin-top: 20px;
      display: flex;
      * + * {
        margin-left: 20px;
      }
      .pet-select-radio-area {
        display: flex;
        align-items: center;
        cursor: pointer;
        .radio-img {
          width: 28px;
          height: 28px;
        }
        div {
          margin-left: 12px;
          justify-content: center;
          .pet-img {
            width: 64px;
            height: 64px;
          }
          .pet-text {
            color: #666;
            font-size: 16px;
            font-family: 'score5';
            margin-top: 4px;
          }
        }
      }
    }
    .gender-select-area {
      display: flex;
      margin-top: 20px;
      * + * {
        margin-left: 10px;
      }
      .gender-select {
        width: 120px;
        height: 40px;
        font-size: 18px;
        font-family: 'score6';
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #9ad144;
        border-radius: 20px;
      }
      .gender-not-select {
        width: 120px;
        height: 40px;
        font-size: 18px;
        font-family: 'score6';
        color: #9ad144;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #9ad144;
        background-color: #fff;
        border-radius: 20px;
      }
    }
  }
  .right-area {
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .bg-area {
      background-color: #f8f8f8;
      border: 1px solid #eaeaea;
      padding: 0px 20px 20px 20px;

      .input-half-group {
        display: flex;
        margin-top: 20px;
        height: 40px;
        * + * {
          margin-left: 12px;
        }
        .coalition-area {
          flex: 1;
          border: 1px solid #ddd;
          background-color: #fff;
          display: flex;
          align-items: center;
          position: relative;
          select {
            width: 100%;
            height: 100%;
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            font-family: 'score2';
            font-size: 16px;
            color: #000;
            background-color: #fff;
            outline: none;
            padding-left: 20px;
          }
          label {
            font-family: 'score2';
            font-size: 14px;
            line-height: 1.3;
            color: #444;
            margin-right: 0.5em;
          }
          .right-arrow {
            position: absolute;
            width: 13.78px;
            height: 8.81px;
            right: 12px;
          }
        }
      }
    }
    .insurance-btn {
      width: 100%;
      height: 60px;
      background-color: #9ad144;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 20px;
      font-family: 'score6';
      cursor: pointer;
    }
  }
}
@media (max-width: 720px) {
  .background {
    width: 100%;
    height: 100%;
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
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
    overflow-y: scroll;
    /* 임시 지정 */
    width: 90%;
    height: 90%;
    border-radius: 30px;
  }

  .top-area {
    width: 100%;
    height: 200px;
    background: url('@/assets/image/img_pet_bg.png') no-repeat;
    background-size: 100% 100%;
    // position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .first-title-area {
      display: flex;
      align-items: center;
      justify-content: center;
      .green-text {
        color: #9ad144;
        font-size: 20px;
        font-family: 'score7';
        display: flex;
      }
      .basic-text {
        color: #fff;
        font-size: 20px;
        font-family: 'score2';
      }
      .bold-text {
        color: #fff;
        font-size: 20px;
        font-family: 'score6';
        display: flex;
      }
    }
    .sub-title-text {
      margin-top: 13px;
      color: #fff;
      font-size: 12px;
      font-family: 'score2';
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .close-btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 35px;
      height: 35px;
      margin-top: 20px;
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .remains-area {
    padding: 20px;
    display: block;
    height: 100%;
    .title-text {
      color: #555;
      font-size: 14px;
      font-family: 'score6';
      margin-top: 20px;
    }
    .input-form {
      border: 1px solid #ddd;
      background-color: #fff;
      flex: 1;
      width: 100%;
      height: 40px;
      padding: 10px;
      color: #000;
      font-size: 14px;
      font-family: 'score2';
      outline: none;
      margin-top: 20px;
    }
    .left-area {
      flex: 1;
      background-color: #f8f8f8;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      border-top: 1px solid #eaeaea;
      border-bottom: 0px solid #eaeaea;
      padding: 20px;
      .radio-area {
        margin-top: 20px;
        display: flex;
        * + * {
          margin-left: 20px;
        }
        .pet-select-radio-area {
          display: flex;
          align-items: center;
          cursor: pointer;
          .radio-img {
            width: 28px;
            height: 28px;
          }
          div {
            margin-left: 12px;
            justify-content: center;
            .pet-img {
              width: 60px;
              height: 60px;
            }
            .pet-text {
              color: #666;
              font-size: 14px;
              font-family: 'score5';
              margin-top: 4px;
            }
          }
        }
      }
      .gender-select-area {
        display: flex;
        margin-top: 20px;
        * + * {
          margin-left: 10px;
        }
        .gender-select {
          width: 120px;
          height: 40px;
          font-size: 16px;
          font-family: 'score6';
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #9ad144;
          border-radius: 20px;
        }
        .gender-not-select {
          width: 120px;
          height: 40px;
          font-size: 16px;
          font-family: 'score6';
          color: #9ad144;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #9ad144;
          background-color: #fff;
          border-radius: 20px;
        }
      }
    }
    .right-area {
      flex: 1;
      margin-left: 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .bg-area {
        background-color: #f8f8f8;
        border-left: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
        border-top: 0px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        padding: 0px 20px 20px 20px;

        .input-half-group {
          display: flex;
          margin-top: 20px;
          height: 40px;
          * + * {
            margin-left: 12px;
          }
          .coalition-area {
            flex: 1;
            border: 1px solid #ddd;
            background-color: #fff;
            display: flex;
            align-items: center;
            position: relative;
            select {
              width: 100%;
              height: 100%;
              -moz-appearance: none;
              -webkit-appearance: none;
              appearance: none;
              font-family: 'score2';
              font-size: 14px;
              color: #000;
              background-color: #fff;
              outline: none;
              padding-left: 10px;
            }
            label {
              font-family: 'score2';
              font-size: 12px;
              line-height: 1.3;
              color: #444;
              margin-right: 0.5em;
            }
            .right-arrow {
              position: absolute;
              width: 13.78px;
              height: 8.81px;
              right: 12px;
            }
          }
        }
      }
      .insurance-btn {
        width: 100%;
        height: 60px;
        background-color: #9ad144;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-family: 'score6';
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
