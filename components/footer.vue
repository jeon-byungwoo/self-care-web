<template>
  <div>
    <div class="main_footer">
      <div class="group">
        <div class="top">
          <img class="footer-logo" />
          <div style="flex: 1"></div>
          <div class="service-group">
            <div class="service-text">이용약관</div>
            <div style="margin-left: 4px; margin-right: 4px">·</div>
            <div class="service-text">개인정보처리방침</div>
            <div style="margin-left: 4px; margin-right: 4px">·</div>
            <div class="service-text">고객센터</div>
          </div>
        </div>
        <div class="middle">
          <div class="left">
            <div class="left-text">
              (주)셀프케어 | 사업자번호: 111-22-3333333 | 대표: 홍길동
            </div>
            <div class="left-text">
              개인정보취급담당부서: 고객경험관리팀 | 개인정보관리책임자:
              홍길동<br />통신판매업신고: 제 2020-서울강남-000009 호 |
              유통판매업신고: 제 2023-00000001 호<br />건강기능식품판매업신고:
              제 2023-0000001 호
            </div>
            <div class="left-text">서울특별시 강남구 봉은사로 1길 (OO빌딩)</div>
            <div class="left-text">제휴문의: self-care@gmail.com</div>
          </div>
          <div class="right">
            <div class="right-title">문의 : 031) 123-4567</div>
            <div class="right-content">평일 오전9시-오후6시</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.main_footer {
  .group {
    width: 1080px;
    height: 300px;
    margin: auto;
    padding: 20px;

    .top {
      display: flex;
      flex-direction: row;
      align-items: center;
      .footer-logo {
        background: #000000;
        width: 200px;
        height: 80px;
      }
      .service-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        .service-text {
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
    .middle {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .right-title {
          font-size: 30px;
        }
        .right-content {
          font-size: 20px;
        }
      }
      .left {
      }
    }
  }
  width: 100%;
}
</style>
