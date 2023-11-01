<template>
  <div>
    <div class="main_footer">
      <div class="group">
        <div class="top-group">
          <div class="left-group">
            <img
              class="logo-image"
              src="@/assets/image/ic_logo_row.png"
              draggable="false"
            />
            <div class="brand-story">
              <div class="brand-story-text" @click="sendData(1)">
                브랜드 스토리
              </div>
            </div>
          </div>

          <div style="flex: 1"></div>
          <div class="service-group">
            <div class="service-text" @click="sendData(3)">이용약관</div>
            <div style="margin-left: 4px; margin-right: 4px">·</div>
            <div class="service-text" @click="sendData(4)">
              개인정보처리방침
            </div>
            <div style="margin-left: 4px; margin-right: 4px">·</div>
            <div class="service-text" @click="sendData(5)">고객센터</div>
          </div>

          <div class="mobile-coalition-group">
            <div class="left-group">
              <div class="first-line">
                <div class="left-text">문의</div>
                <div class="right-text">1544-1942</div>
              </div>
              <div class="second-line">평일 오전9시-오후6시</div>
            </div>
            <div class="right-btn" @click="sendData(2)">제휴/입점 문의</div>
          </div>
        </div>
        <div class="bottom-group">
          <div class="left-group">
            <div class="first-line-group">
              <div class="regular-text">주식회사 브레인캠퍼스&nbsp;</div>
              <div class="bold-text">사업자번호</div>
              <div class="regular-text">&nbsp;: 554-87-01088&nbsp;</div>
              <div class="bold-text">대표</div>
              <div class="regular-text">&nbsp;: 전병우&nbsp;</div>
            </div>
            <div class="second-line-group">
              <div class="bold-text-flex">
                개인정보취급담당부서
                <div class="regular-text">
                  &nbsp;: 고객경험관리팀&nbsp;&nbsp;
                </div>
              </div>

              <div class="bold-text-flex">
                개인정보관리책임자
                <div class="regular-text">&nbsp;: 전병우&nbsp;&nbsp;</div>
              </div>

              <div class="bold-text-flex">
                통신판매업신고
                <div class="regular-text">
                  &nbsp;: 제 2018 인천부평 0851호 |&nbsp;
                </div>
              </div>
            </div>
            <div class="third-line-group">
              <!-- <div class="bold-text-flex">
                의료기기판매업신고
                <div class="regular-text">
                  &nbsp;: 제 2023-00000001 호&nbsp;&nbsp;
                </div>
              </div> -->

              <div class="bold-text-flex">
                건강기능식품판매업신고
                <div class="regular-text">
                  &nbsp;: 제 2018-0107318 호&nbsp;&nbsp;
                </div>
              </div>
            </div>
            <div class="fourth-line-group">
              <div class="regular-text">
                인천광역시 부평구 체육관로40 1103호(신영프라자)
              </div>
            </div>
            <div class="fifth-line-group">
              <div class="bold-text">제휴문의</div>
              <div class="regular-text">
                &nbsp;: jbw7080@naver.com&nbsp;&nbsp;
              </div>
            </div>
          </div>
          <div style="flex: 1"></div>
          <div class="right-group">
            <div class="right-header-text">문의</div>
            <div class="right-middle-text">1544-1942</div>
            <div class="right-bottom-text">평일 오전10시-오후6시</div>
            <div class="right-button-group">
              <div class="right-button-text" @click="sendData(2)">
                제휴/입점 문의
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      footerClickStatus: 0,
    }
  },
  methods: {
    sendData(status) {
      this.$emit('sendData', status)
    },
  },
}
</script>

<style lang="scss" scoped>
.main_footer {
  width: 100%;
  background: #fafafa;
  .group {
    max-width: 1200px;
    height: 343x;
    margin: auto;
    display: flex;
    padding: 0px 20px;
    flex-direction: column;
    .top-group {
      width: 100%;
      height: 101px;
      display: flex;
      align-items: center;
      .left-group {
        display: flex;
        align-items: center;
        .logo-image {
          width: 110px;
          height: 44px;
        }
        .brand-story {
          margin-left: 50px;
          width: 130px;
          height: 45px;
          border-width: 1px;
          border-style: solid;
          border-radius: 30px;
          border-color: #cccccc;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .brand-story-text {
            font-size: 14px;
            color: #666666;
            font-family: 'score5';
          }
        }
      }
      .service-group {
        display: flex;
        .service-text {
          font-size: 16px;
          color: #333333;
          font-family: 'score5';
          cursor: pointer;
        }
      }
      .mobile-coalition-group {
        display: none;
      }
    }
    .bottom-group {
      width: 100%;
      display: flex;
      padding: 40px 0px;
      height: 242px;
      .left-group {
        .first-line-group {
          display: flex;
        }
        .second-line-group {
          display: flex;
          margin-top: 10px;
        }
        .third-line-group {
          display: flex;
          margin-top: 10px;
        }
        .fourth-line-group {
          display: flex;
          margin-top: 10px;
        }
        .fifth-line-group {
          display: flex;
          margin-top: 10px;
        }
        .bold-text-flex {
          font-size: 14px;
          color: #444444;
          font-family: 'score5';
          display: flex;
        }

        .bold-text {
          font-size: 14px;
          color: #444444;
          font-family: 'score5';
        }
        .regular-text {
          font-size: 14px;
          color: #444444;
          font-family: 'score2';
        }
      }
      .right-group {
        display: flex;
        flex-direction: column;
        .right-header-text {
          font-size: 16px;
          color: #333333;
          font-family: 'score5';
        }
        .right-middle-text {
          font-size: 30px;
          color: #333333;
          font-family: 'score8';
          margin-top: 10px;
        }
        .right-bottom-text {
          font-size: 14px;
          color: #666666;
          font-family: 'score2';
          margin-top: 10px;
        }
        .right-button-group {
          display: flex;
          margin-top: 20px;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 50px;
          background: white;
          border-radius: 5px;
          border-style: solid;
          border-width: 1px;
          border-color: #333333;
          cursor: pointer;
        }
        .right-button-text {
          font-size: 14px;
          color: #333333;
          font-family: 'score5';
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .main_footer {
    width: 100%;
    background: #fafafa;

    .group {
      width: 100%;
      .top-group {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .left-group {
          width: 100%;
          display: flex;
          justify-content: center;
          .logo-image {
            width: 15.28%;
            height: auto;
          }
          .brand-story {
            margin-left: 12px;
            width: 27.78%;
            height: 35px;
            border-width: 1px;
            border-style: solid;
            border-radius: 30px;
            border-color: #cccccc;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .brand-story-text {
              font-size: 12px;
              color: #666666;
              font-family: 'score5';
            }
          }
        }
        .service-group {
          display: flex;
          margin-top: 10px;
          .service-text {
            font-size: 12px;
            color: #333333;
            font-family: 'score5';
            cursor: pointer;
          }
        }
        .mobile-coalition-group {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          .left-group {
            display: block;
            .first-line {
              display: flex;
              align-items: center;
              .left-text {
                font-size: 12px;
                color: #333333;
                font-family: 'score5';
              }
              .right-text {
                font-size: 14px;
                color: #333333;
                font-family: 'score8';
                margin-left: 8px;
              }
            }
            .second-line {
              margin-top: 4px;
              font-size: 12px;
              color: #333333;
              font-family: 'score2';
            }
          }
          .right-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 150px;
            height: 40px;
            font-size: 12px;
            color: #333333;
            font-family: 'score5';
            background: white;
            border-radius: 5px;
            border: 1px solid #333333;
            cursor: pointer;
          }
        }
      }
      .bottom-group {
        display: block;
        flex-wrap: wrap;
        justify-content: center;
        padding: 12px 0px;
        .left-group {
          .first-line-group {
            margin-top: 10px;
            display: flex;
            justify-content: center;
          }
          .second-line-group {
            display: flex;
            flex-direction: column;
            margin-top: 0px;
            justify-content: center;
            align-items: center;
          }
          .third-line-group {
            display: flex;
            flex-direction: column;
            margin-top: 0px;
            justify-content: center;
            align-items: center;
          }
          .fourth-line-group {
            display: flex;
            margin-top: 10px;
            justify-content: center;
          }
          .fifth-line-group {
            display: flex;
            margin-top: 10px;
            justify-content: center;
          }
          .bold-text {
            font-size: 12px;
            color: #444444;
            font-family: 'score5';
          }
          .regular-text {
            font-size: 12px;
            color: #444444;
            font-family: 'score2';
          }
          .bold-text-flex {
            font-size: 12px;
            color: #444444;
            font-family: 'score5';
            display: flex;
            margin-top: 10px;
          }
        }
        .right-group {
          display: none;
        }
      }
    }
  }
}
</style>
