<template>
  <div>
    <Header @update="onChildUpdate"></Header>
    <div class="main" v-if="!navigationStatus">
      <div class="body">
        <div class="title-area">
          <div class="bold-text">
            {{ '홍길동' }}
            <span class="regular-text">님의</span>
            <div class="regular-text">라이프 스타일 결과 입니다.</div>
          </div>
        </div>
        <div class="first-box-group">
          <div class="black-line"></div>
          <div class="box-area">
            <div class="left-area">
              <div class="title">성별</div>
              <div class="object">남성</div>
            </div>
            <div class="right-area">
              <div class="title">나이</div>
              <div class="object">40세</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="box-area">
            <div class="left-area">
              <div class="title">BMI</div>
              <div class="bmi-text-object">
                24.6
                <div class="bmi-text">
                  BMI = 1.3 x {체중 (kg)} / {키 (m)2.5}
                </div>
              </div>
            </div>
            <div class="right-area">
              <div class="title">성별</div>
              <div class="object">남성</div>
            </div>
          </div>
          <div class="line"></div>
        </div>

        <div class="second-box-group">
          <div class="black-line"></div>
          <div class="one-group">
            <div
              class="one-list-item"
              v-for="(item, index) in itemList"
              :key="index"
            >
              <div class="title-area">{{ item.text }}</div>
              <div class="score-area">
                <div
                  :class="
                    item.score == 0
                      ? 'score-good'
                      : item.score == 1
                      ? 'score-basic'
                      : item.score == 2
                      ? 'score-bad'
                      : 'score-worst'
                  "
                >
                  {{
                    item.score == 0
                      ? '양호'
                      : item.score == 1
                      ? '보통'
                      : item.score == 2
                      ? '경계'
                      : '불량'
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="third-box-group">
          <div class="left-icon-text-area">
            <img
              class="icon"
              src="@/assets/image/ic_life_result_test.png"
              draggable="false"
            />
            <div class="text">면역</div>
          </div>
          <div class="middle-right-group">
            <div class="middle-score-area">
              <div
                :class="
                  score == 0
                    ? 'score-good'
                    : score == 1
                    ? 'score-basic'
                    : score == 2
                    ? 'score-bad'
                    : 'score-worst'
                "
              >
                {{
                  score == 0
                    ? '양호'
                    : score == 1
                    ? '보통'
                    : score == 2
                    ? '경계'
                    : '불량'
                }}
              </div>
            </div>
            <div class="right-info-area">
              <div class="info">
                당신은 면역 건강의 균형을 유지하는데 필요한 라이프 스타일을
                가지고 있습니다.
              </div>
            </div>
          </div>
        </div>

        <div class="recommend-group">
          <div class="title-area">
            <div class="bold-text">
              {{ '홍길동' }}<span class="regular-text">님의 AI추천&nbsp;</span>
              <div class="regular-text">영양성분 결과</div>
            </div>
          </div>
          <div class="share-area">
            <img
              class="share-icon"
              src="@/assets/image/ic_share.png"
              draggable="false"
            />
            <div class="share-text">공유</div>
          </div>
        </div>
        <div class="product-area">
          <div class="product-item-area">
            <div class="product-img-area">
              <img
                class="product-img"
                src="@/assets/image/img_medicine_test.png"
                draggable="false"
              />
            </div>
            <div class="product-name">프로바이오틱스</div>
          </div>
          <div class="product-item-area">
            <div class="product-img-area">
              <img
                class="product-img"
                src="@/assets/image/img_medicine_test.png"
                draggable="false"
              />
            </div>
            <div class="product-name">프로바이오틱스</div>
          </div>
          <div class="product-item-area">
            <div class="product-img-area">
              <img
                class="product-img"
                src="@/assets/image/img_medicine_test.png"
                draggable="false"
              />
            </div>
            <div class="product-name">프로바이오틱스</div>
          </div>
          <div class="cart-btn">장바구니에 담기</div>
        </div>

        <div class="consulting-group">
          <div class="left-area">
            <div class="title-area">
              <div class="regular-text">
                {{
                  employeeStatus == true
                    ? '자세한 결과 분석은'
                    : '자세한 결과 분석을 원한다면'
                }}
              </div>
              <div class="bold-regular-area">
                <div class="bold-text">
                  {{
                    employeeStatus == true
                      ? '담당자를 통해 상담'
                      : '셀프케어에 상담'
                  }}
                </div>
                <div class="regular-text">&nbsp;해보세요.</div>
              </div>
            </div>
            <div :class="employeeStatus == true ? 'employee-area' : 'rep-area'">
              <img
                v-if="employeeStatus == true"
                src="@/assets/image/ic_employee.png"
                class="employee-img"
                draggable="false"
              />
              <img
                v-if="employeeStatus == false"
                src="@/assets/image/ic_logo_row.png"
                class="employee-img"
                draggable="false"
              />
              <div class="employee-name-area">
                <div v-if="employeeStatus == true" class="employee-name-bold">
                  김영희
                </div>
                <div class="employee-name-regular">
                  &nbsp;{{ employeeStatus == true ? '상담사' : '대표번호' }}
                </div>
              </div>
              <div class="employee-phone-num">010.1111.1234</div>
            </div>
            <div
              :class="
                employeeStatus == true ? 'employee-btn-group' : 'rep-btn-group'
              "
            >
              <div class="call-btn-area">
                <img
                  class="call-icon"
                  src="@/assets/image/ic_phone.png"
                  draggable="false"
                />
                <div class="call-text">전화하기</div>
              </div>
              <div v-if="employeeStatus == true" class="move-btn">
                인큐텐 바로가기
              </div>
            </div>
          </div>
          <div class="phone-img-area">
            <img
              src="@/assets/image/img_consulting_phone.png"
              class="phone-img"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {
    Header,
  },
  data() {
    return {
      score: 2,
      employeeStatus: true,
      navigationStatus: false,
      itemList: [
        { text: '면역', score: 0 },
        { text: '순환', score: 1 },
        { text: '소화', score: 3 },
        { text: '장관', score: 2 },
        { text: '뇌신경', score: 1 },
        { text: '호르몬', score: 0 },
        { text: '호흡', score: 2 },
        { text: '비뇨', score: 3 },
        { text: '골격', score: 1 },
        { text: '피부,모발', score: 1 },
      ],
    }
  },
  methods: {
    onChildUpdate(newValue) {
      console.log('index', newValue)
      this.navigationStatus = newValue
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin-top: 197px;
  .body {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 50px 0px;
    .title-area {
      display: flex;
    }
    .bold-text {
      color: #333333;
      font-size: 30px;
      font-family: 'score6';
      display: flex;
    }
    .regular-text {
      color: #333333;
      font-size: 30px;
      font-family: 'score2';
    }
    .black-line {
      width: 100%;
      height: 2px;
      background-color: #000;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #ddd;
    }
    .score-good {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #9ad144;
      border: 1px solid #9ad144;
      background-color: #fff;
    }
    .score-basic {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #6289f2;
      border: 1px solid #6289f2;
      background-color: #fff;
    }
    .score-bad {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #f39818;
      border: 1px solid #f39818;
      background-color: #fff;
    }
    .score-worst {
      width: 89px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: 'score5';
      color: #ff4c40;
      border: 1px solid #ff4c40;
      background-color: #fff;
    }
    .first-box-group {
      margin-top: 36px;
      .box-area {
        display: flex;
        width: 100%;
        height: 81px;
        .left-area {
          flex: 1;
          display: flex;
          .title {
            flex: 1;
            background-color: #fbfbfd;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            font-size: 18px;
            font-family: 'score5';
          }
          .object {
            flex: 2;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #333333;
            font-size: 18px;
            font-family: 'score2';
            .bmi-text {
              margin-left: 20px;
              color: #666666;
              font-size: 16px;
              font-family: 'score2';
            }
          }
          .bmi-text-object {
            flex: 2;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #333333;
            font-size: 18px;
            font-family: 'score2';
            .bmi-text {
              margin-left: 20px;
              color: #666666;
              font-size: 16px;
              font-family: 'score2';
            }
          }
        }
        .right-area {
          flex: 1;
          display: flex;
          .title {
            flex: 1;
            background-color: #fbfbfd;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333333;
            font-size: 18px;
            font-family: 'score5';
          }
          .object {
            flex: 2;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #333333;
            font-size: 18px;
            font-family: 'score2';
          }
        }
      }
    }

    .second-box-group {
      margin-top: 72px;
      .one-group {
        display: flex;
      }
      .one-list-item {
        flex: 1;
      }
      .title-area {
        height: 80px;
        background-color: #fbfbfd;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333;
        font-size: 18px;
        font-family: 'score5';
        border-bottom: 1px solid #ddd;
      }

      .score-area {
        flex: 1;
        height: 80px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ddd;
      }
    }
    .third-box-group {
      margin-top: 70px;
      padding: 50px;
      background-color: #fbfbfd;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      .left-icon-text-area {
        display: flex;
        flex: 0.2;
        .icon {
          width: 20px;
          height: 22px;
        }
        .text {
          margin-left: 10px;
          color: #333333;
          font-size: 18px;
          font-family: 'score5';
        }
      }
      .middle-right-group {
        display: flex;
        flex: 0.8;
        align-items: center;
      }
      .middle-score-area {
        width: 89px;
        height: 40px;
      }
      .right-info-area {
        margin-left: 20px;

        color: #666;
        font-size: 18px;
        font-family: 'score2';
      }
    }

    .recommend-group {
      margin-top: 70px;
      display: flex;
      .title-area {
        flex: 1;
      }
      .share-area {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        width: 100px;
        height: 40px;
        border: 1px solid #dddddd;
        background-color: #fff;
        cursor: pointer;
        .share-icon {
          width: 15px;
          height: 20px;
        }
        .share-text {
          margin-left: 10px;
          color: #333;
          font-size: 16px;
          font-family: 'score2';
        }
      }
    }
    .product-area {
      margin-top: 40px;
      display: flex;
      .product-item-area {
        width: 230px;
        height: 80px;
        border-radius: 40px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        margin-right: 13px;
        .product-img-area {
          width: 54px;
          height: 54px;
          border-radius: 27px;
          background-color: #efefef;
          display: flex;
          align-items: center;
          justify-content: center;
          .product-img {
            width: 23px;
            height: 28px;
          }
        }

        .product-name {
          margin-left: 17px;
          color: #333;
          font-size: 16px;
          font-family: 'score2';
        }
      }
      .cart-btn {
        width: 230px;
        height: 80px;
        border-radius: 40px;
        background-color: #9ad144;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-family: 'score6';
        cursor: pointer;
      }
    }
    .consulting-group {
      margin-top: 70px;
      padding: 48px 22px;
      border: 1px solid #ddd;
      background-color: #fff;
      display: flex;
      .left-area {
        flex: 1;
        padding: 12px 20px 16px 48px;
        .title-area {
          display: flex;
          flex-direction: column;
          .bold-regular-area {
            display: flex;
          }
          .bold-text {
            color: #000;
            font-size: 45px;
            font-family: 'score6';
          }
          .regular-text {
            color: #000;
            font-size: 45px;
            font-family: 'score2';
          }
        }
        .employee-area {
          margin-top: 30px;
          display: flex;
          align-items: center;
          .employee-img {
            width: 56px;
            height: 56px;
            border-radius: 28px;
          }
          .employee-name-area {
            margin-left: 15px;
            display: flex;
          }
          .employee-name-bold {
            color: #333;
            font-size: 24px;
            font-family: 'score6';
          }
          .employee-name-regular {
            color: #333;
            font-size: 24px;
            font-family: 'score2';
          }
          .employee-phone-num {
            margin-left: 20px;
            color: #88bb38;
            font-size: 24px;
            font-family: 'score7';
          }
        }
        .employee-btn-group {
          margin-top: 30px;
          display: flex;
          .call-btn-area {
            width: 200px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #333;
            .call-icon {
              width: 20px;
              height: 20px;
            }
            .call-text {
              margin-left: 7px;
              color: #fff;
              font-size: 18px;
              font-family: 'score5';
            }
          }
          .move-btn {
            width: 200px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border: 1px solid #333;
            margin-left: 10px;
            color: #333;
            font-size: 18px;
            font-family: 'score5';
          }
        }
        .rep-area {
          margin-top: 40px;
          display: flex;
          align-items: center;
          .employee-img {
            width: 78px;
            height: 32px;
          }
          .employee-name-area {
            margin-left: 20px;
            display: flex;
          }
          .employee-name-bold {
            color: #333;
            font-size: 24px;
            font-family: 'score6';
          }
          .employee-name-regular {
            color: #333;
            font-size: 24px;
            font-family: 'score2';
          }
          .employee-phone-num {
            margin-left: 20px;
            color: #88bb38;
            font-size: 24px;
            font-family: 'score7';
          }
        }
        .rep-btn-group {
          margin-top: 44px;
          display: flex;
          .call-btn-area {
            width: 200px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #333;
            .call-icon {
              width: 20px;
              height: 20px;
            }
            .call-text {
              margin-left: 7px;
              color: #fff;
              font-size: 18px;
              font-family: 'score5';
            }
          }
        }
      }
      .phone-img-area {
        width: 312px;
        height: 324px;
        .phone-img {
          width: 312px;
          height: 324px;
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .main {
    width: 100%;
    margin-top: 30px;
    .body {
      width: 100%;
      margin: auto;
      padding: 30px 20px;
      .title-area {
        display: flex;
      }
      .bold-text {
        color: #333333;
        font-size: 24px;
        font-family: 'score6';
        display: inline-block;
        line-height: 1.4;
      }
      .regular-text {
        color: #333333;
        font-size: 24px;
        font-family: 'score2';
      }
      .black-line {
        width: 100%;
        height: 2px;
        background-color: #000;
      }
      .line {
        width: 100%;
        height: 1px;
        background-color: #ddd;
      }
      .score-good {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #9ad144;
        border: 1px solid #9ad144;
        background-color: #fff;
      }
      .score-basic {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #6289f2;
        border: 1px solid #6289f2;
        background-color: #fff;
      }
      .score-bad {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #f39818;
        border: 1px solid #f39818;
        background-color: #fff;
      }
      .score-worst {
        width: 18vw;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: 'score5';
        color: #ff4c40;
        border: 1px solid #ff4c40;
        background-color: #fff;
      }
      .first-box-group {
        margin-top: 36px;
        .box-area {
          display: block;
          width: 100%;
          height: auto;
          .left-area {
            flex: 1;
            display: flex;
            height: auto;
            .title {
              flex: 1;
              background-color: #fbfbfd;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333333;
              font-size: 16px;
              font-family: 'score5';
            }
            .object {
              flex: 2;
              background-color: #fff;
              display: flex;
              align-items: center;
              padding-left: 30px;
              color: #333333;
              font-size: 16px;
              font-family: 'score2';
              padding-top: 10px;
              padding-bottom: 10px;
              .bmi-text {
                margin-left: 20px;
                color: #666666;
                font-size: 14px;
                font-family: 'score2';
              }
            }
            .bmi-text-object {
              flex: 2;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              padding-left: 30px;
              color: #333333;
              font-size: 16px;
              font-family: 'score2';
              padding-top: 10px;
              padding-bottom: 10px;
              .bmi-text {
                margin-left: 0px;
                color: #666666;
                font-size: 14px;
                font-family: 'score2';
              }
            }
          }
          .right-area {
            flex: 1;
            display: flex;
            height: 40px;
            .title {
              flex: 1;
              background-color: #fbfbfd;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333333;
              font-size: 16px;
              font-family: 'score5';
            }
            .object {
              flex: 2;
              background-color: #fff;
              display: flex;
              align-items: center;
              padding-left: 30px;
              color: #333333;
              font-size: 16px;
              font-family: 'score2';
            }
          }
        }
      }

      .second-box-group {
        margin-top: 40px;
        width: 100%;
        .one-group {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        .one-list-item {
          width: 92vw;
          display: flex;
        }
        .title-area {
          width: 20vw;
          height: 80px;
          background-color: #fbfbfd;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          font-size: 16px;
          font-family: 'score5';
          border-bottom: 1px solid #ddd;
        }

        .score-area {
          width: 20vw;
          height: 80px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #ddd;
        }
      }
      .third-box-group {
        margin-top: 40px;
        padding: 20px;
        background-color: #fbfbfd;
        border: 1px solid #ddd;
        display: block;
        align-items: center;
        .left-icon-text-area {
          display: flex;
          flex: 0.2;
          .icon {
            width: 16px;
            height: 18px;
          }
          .text {
            margin-left: 4px;
            color: #333333;
            font-size: 16px;
            font-family: 'score5';
          }
        }
        .middle-right-group {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          margin-top: 6px;
          .middle-score-area {
            width: 89px;
            height: 40px;
          }
          .right-info-area {
            margin-left: 10px;
            color: #666;
            font-size: 16px;
            line-height: 1.4;
            font-family: 'score2';
          }
        }
      }

      .recommend-group {
        margin-top: 40px;
        display: flex;
        .title-area {
          flex: 1;
        }
        .share-area {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          width: 80px;
          height: 35px;
          border: 1px solid #dddddd;
          background-color: #fff;
          cursor: pointer;
          .share-icon {
            width: 13px;
            height: 18px;
          }
          .share-text {
            margin-left: 6px;
            color: #333;
            font-size: 14px;
            font-family: 'score2';
          }
        }
      }
      .product-area {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .product-item-area {
          width: 43vw;
          height: 60px;
          border-radius: 40px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ddd;
          margin-right: 0px;
          padding: 0px 5px;
          .product-img-area {
            width: 40px;
            height: 40px;
            border-radius: 27px;
            background-color: #efefef;
            display: flex;
            align-items: center;
            justify-content: center;
            .product-img {
              width: 20px;
              height: 25px;
            }
          }

          .product-name {
            margin-left: 6px;
            color: #333;
            font-size: 14px;
            font-family: 'score2';
          }
        }
        .cart-btn {
          margin-top: 30px;
          width: 100%;
          height: 60px;
          border-radius: 40px;
          background-color: #9ad144;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 18px;
          font-family: 'score6';
          cursor: pointer;
        }
      }
      .consulting-group {
        margin-top: 40px;
        padding: 20px;
        border: 1px solid #ddd;
        background-color: #fff;
        display: block;
        .left-area {
          flex: 1;
          padding: 10px 0px;
          .title-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .bold-regular-area {
              display: flex;
            }
            .bold-text {
              color: #000;
              font-size: 22px;
              font-family: 'score6';
            }
            .regular-text {
              color: #000;
              font-size: 22px;
              font-family: 'score2';
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .employee-area {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            .employee-img {
              width: 30px;
              height: 30px;
              border-radius: 28px;
            }
            .employee-name-area {
              margin-left: 10px;
              display: flex;
            }
            .employee-name-bold {
              color: #333;
              font-size: 16px;
              font-family: 'score6';
            }
            .employee-name-regular {
              color: #333;
              font-size: 16px;
              font-family: 'score2';
            }
            .employee-phone-num {
              margin-left: 10px;
              color: #88bb38;
              font-size: 16px;
              font-family: 'score7';
            }
          }
          .employee-btn-group {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            .call-btn-area {
              width: 160px;
              height: 50px;
              border-radius: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #333;
              .call-icon {
                width: 20px;
                height: 20px;
              }
              .call-text {
                margin-left: 7px;
                color: #fff;
                font-size: 16px;
                font-family: 'score5';
              }
            }
            .move-btn {
              width: 160px;
              height: 50px;
              border-radius: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
              border: 1px solid #333;
              margin-left: 10px;
              color: #333;
              font-size: 16px;
              font-family: 'score5';
            }
          }
          .rep-area {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .employee-img {
              width: 16%;
              height: auto;
            }
            .employee-name-area {
              margin-left: 10px;
              display: flex;
            }
            .employee-name-bold {
              color: #333;
              font-size: 16px;
              font-family: 'score6';
            }
            .employee-name-regular {
              color: #333;
              font-size: 16px;
              font-family: 'score2';
            }
            .employee-phone-num {
              margin-left: 10px;
              color: #88bb38;
              font-size: 16px;
              font-family: 'score7';
            }
          }
          .rep-btn-group {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            .call-btn-area {
              width: 160px;
              height: 50px;
              border-radius: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #333;
              .call-icon {
                width: 20px;
                height: 20px;
              }
              .call-text {
                margin-left: 7px;
                color: #fff;
                font-size: 16px;
                font-family: 'score5';
              }
            }
          }
        }
        .phone-img-area {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          .phone-img {
            width: 60%;
            height: 62%;
            margin-left: 40px;
          }
        }
      }
    }
  }
}
</style>
