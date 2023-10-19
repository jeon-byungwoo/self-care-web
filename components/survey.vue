<template>
  <div class="main-warper">
    <div class="main-warper-group">
      <div class="survey-left-group">
        <div class="survey-text-header">맞춤 설문</div>
        <div class="survey-text-middle">
          간단한 맞춤 설문으로 나에게 꼭 맞는<br />영양 성분을 추천받아보세요.
        </div>
        <div class="survey-btns-group">
          <div class="survey-ai-btn">
            <img
              class="survey-ai-btn-check"
              src="@/assets/image/ic_ai_check.png"
              draggable="false"
            />
            <div class="survey-ai-btn-text">AI 건강설문 하기</div>
          </div>
          <div class="survey-consulting-btn">
            <div class="survey-consulting-btn-text">전문가와 상담하기</div>
          </div>
        </div>
      </div>
      <div class="survey-right-group">
        <div class="survey-right-group2">
          <img
            class="survey-img"
            src="@/assets/image/img_survey.png"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'howToView',
  data() {
    return {}
  },
  methods: {
    preClick() {},
  },
}
</script>

<style lang="scss" scoped>
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.main-warper {
  width: 100%;
  margin: auto;
  padding: 100px 20px;
  background: #f6f6f6;
  .main-warper-group {
    max-width: 1200px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .survey-left-group {
    .survey-text-header {
      font-size: 18px;
      font-family: 'score2';
      color: #666666;
    }
    .survey-text-middle {
      font-size: 32px;
      font-family: 'score6';
      color: #333333;
      margin-top: 10px;
      line-height: 45px;
    }
    .survey-btns-group {
      display: flex;
      flex-direction: row;
      margin-top: 30px;
    }
    .survey-ai-btn {
      width: 207px;
      height: 55px;
      border-radius: 50px;
      background: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .survey-ai-btn-check {
      width: 22px;
      height: 20px;
    }
    .survey-ai-btn-text {
      margin-left: 7px;
      color: white;
      font-family: 'score5';
      font-size: 16px;
    }
    .survey-consulting-btn {
      width: 207px;
      height: 55px;
      border-radius: 50px;
      margin-left: 10px;
      border-color: #333333;
      background: white;
      border-style: solid;
      border-width: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .survey-consulting-btn-text {
      color: #333333;
      font-family: 'score5';
      font-size: 16px;
    }
  }
  .survey-right-group {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    .survey-right-group2 {
      width: max-content;
    }
    .survey-img {
      width: 282px;
      height: 281px;
    }
  }
}
@media (max-width: 767px) {
  .main-warper {
    padding: 40px 20px;
    background: #f6f6f6;
    width: 100%;
    .main-warper-group {
      width: 100%;
      display: block;
    }
    .survey-left-group {
      .survey-text-header {
        font-size: 14px;
        font-family: 'score2';
        color: #84ba24;
      }
      .survey-text-middle {
        font-size: 18px;
        font-family: 'score6';
        color: #333333;
        margin-top: 10px;
        line-height: 1.4;
      }
      .survey-btns-group {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
      }
      .survey-ai-btn {
        width: 48%;
        height: 55px;
        border-radius: 50px;
        background: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .survey-ai-btn-check {
        width: 18px;
        height: 16px;
      }
      .survey-ai-btn-text {
        margin-left: 4px;
        color: white;
        font-family: 'score5';
        font-size: 14px;
      }
      .survey-consulting-btn {
        width: 48%;
        height: 55px;
        border-radius: 50px;
        margin-left: 10px;
        border-color: #333333;
        background: white;
        border-style: solid;
        border-width: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .survey-consulting-btn-text {
        color: #333333;
        font-family: 'score5';
        font-size: 14px;
      }
    }
    .survey-right-group {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .survey-right-group2 {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .survey-img {
        width: 47.78%;
        height: auto;
        margin-top: 30px;
      }
    }
  }
}
</style>
