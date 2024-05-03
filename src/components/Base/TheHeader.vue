<template>
  <header class="header">
    <div :class="{'header__left' : !isAuthorization, 'header__left-authorization': isAuthorization }">
      <router-link to="/">
        <PictureComponent :srcset="logoSrcset"  :src="logoSrc" :alt="'logo'" />
      </router-link>

      <UIInput v-model="searchQuery" @input="$emit('updateInputValue', searchQuery)" @clearInput="clearInputValue"/>
    </div>

    <UIButton class="header__button" @click="openPopup" v-if="!isAuthorization" :class="{ 'disabled': isPopupSecondOpen}">
      Connect wallet
    </UIButton>

    <div class="header__authorization" v-if="isAuthorization">
      <UIButton class="header__button" @click="openArtworkPopup">
        + Add artwork
      </UIButton>

      <UIDropdownUser @update:openPopup="handleOpenPopup" @update:cardSold="cardSold">
        <button @click="exit" class="dropdown-user__button-exit">Log out</button>
      </UIDropdownUser>
    </div>

    <UIPopup v-if="isOpenBalancePopup">
      <BaseSvg :id="'cross'" @click="closeBalancePopup" class="popup__cross-icon"/>

      <h3 class="popup__text artwork-popup__popup-text">Balance settings</h3>

      <div class="balance-popup__wrapper">
        <div class="balance-popup">
          <div class="balance-popup__top">
            <div class="balance-popup__top-img">
              <PictureComponent :srcset="logoSoldSrcset" :src="logoSoldSrc" :alt="'logo'"/>
              {{ sold }}
            </div>
            <button @click="openWithrowPopup">Withdraw</button>
          </div>
        </div>
        <div class="balance-popup">
          <div class="balance-popup__top">
            <div class="balance-popup__top-img">
              <PictureComponent :srcset="logo2Srcset" :src="logo2Src" :alt="'logo'"/>
              {{ sold }}
            </div>
            <div class="balance-popup__top-buttons">
              <button @click="openSwapPopup">Swap to TASTE</button>
              <button @click="openDepositPopup">Deposit</button>
              <button @click="openWithrowPopup">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </UIPopup>

    <UIPopup v-if="isOpenWithrowPopup">
      <BaseSvg :id="'cross'" @click="closeWithrowPopup" class="popup__cross-icon"/>
      <BaseSvg :id="'popup-arrow'" @click="backWithrow" class="popup__arrow-icon"/>

      <h3 class="popup__text artwork-popup__popup-text">Withdraw</h3>

      <div class="artwork-third__form-sum">
        <UIInputSum :text = '"You will get"' :sum = '"(1308.54$)"' :input-text = '"TASTE"' v-model="inputValue">
          <PictureComponent :srcset="logoWithdrownSrcset" :src="logoWithdrownSrc" :alt="'logo'"/>
          {{ sold }}
        </UIInputSum>
      </div>

      <div class="withrow-popup__button">
        <UIButton @click="withrowConfirm">Confirm</UIButton>
      </div>
    </UIPopup>

    <UIPopup v-if="isOpenSwapPopup">
      <BaseSvg :id="'cross'" @click="closeSwapPopup" class="popup__cross-icon"/>
      <BaseSvg :id="'popup-arrow'" @click="backSwap" class="popup__arrow-icon"/>

      <h3 class="popup__text artwork-popup__popup-text">Swap to TASTE</h3>

      <div class="artwork-third__form-sum">
        <UIInputSum :text = '"You will get"' :sum = '"(1308.54$)"' :input-text = '"TASTE"' v-model="inputValue"/>
      </div>

      <div class="withrow-popup__button">
        <UIButton @click="swapButton">Swap</UIButton>
      </div>
    </UIPopup>

    <UIPopup v-if="isOpenDepositPopup">
      <BaseSvg :id="'cross'" @click="closeDepositPopup" class="popup__cross-icon"/>
      <BaseSvg :id="'popup-arrow'" @click="backDeposit" class="popup__arrow-icon"/>

      <h3 class="popup__text artwork-popup__popup-text">Deposit to BNB</h3>

      <div class="artwork-third__form-sum">
        <UIInputSum :text = '"You will get"' :sum = '"(1308.54$)"' :input-text = '"BNB"' v-model="inputValue">
          <PictureComponent :srcset="logoWithdrownSrcset" :src="logoWithdrownSrc" :alt="'logo'"/>
          {{ sold }}
        </UIInputSum>
      </div>

      <div class="withrow-popup__button">
        <UIButton @click="depositButton">Deposit</UIButton>
      </div>
    </UIPopup>


    <UIPopup class="artwork-popup" v-if="isOpenArtworkPopup" @closePopup="closeArtworkPopup">
      <BaseSvg :id="'cross'" @click="closeArtworkPopup" class="popup__cross-icon"/>

      <h3 class="popup__text artwork-popup__popup-text">Creating artwork</h3>

      <div class="artwork-popup__pagination-wrapper">
        <div class="artwork-popup__pagination"></div>
        <div class="artwork-popup__pagination"></div>
        <div class="artwork-popup__pagination"></div>
      </div>
      <p class="artwork-popup__text">
        Step 1 from 3
      </p>
      <h3 class="artwork-popup__subtitle">
        Upload the artwork you will be selling
      </h3>
      <div class="artwork-popup__img-wrapper" @click="addPhoto">
        <input type="file" ref="photoInput" style="display: none" @change="handleFileChange" accept=".jpg, .gif, .png">
        <div class="artwork-popup__img-formats" v-if="!photoFile">
          <p class="artwork-popup__img-format">1500x500px.</p>
          <p class="artwork-popup__img-format">JPG, PNG or GIF.</p>
          <p class="artwork-popup__img-format">100MB max size.</p>

          <h4 class="artwork-popup__img-text">
            Drag and drop an image here, or click to browse
          </h4>
        </div>
        <div class="artwork-popup__img-formats" v-else>
          <p class="artwork-popup__img-format">FILE ADDED</p>
        </div>
      </div>

      <div class="artwork-popup__button">
        <UIButton @click="openSecondArtworkPopup" :class="{'button_disabled' : !photoFile}">
          Next step
        </UIButton>
      </div>
    </UIPopup>

    <UIPopup v-if="isOpenSecondArtworkPopup" @closePopup="closeSecondArtworkPopup">
      <BaseSvg :id="'cross'" @click="closeSecondArtworkPopup" class="popup__cross-icon"/>

      <h3 class="popup__text artwork-popup__popup-text">Creating artwork</h3>

      <div class="artwork-popup__pagination-wrapper">
        <div class="artwork-popup__pagination artwork-second__pagination"></div>
        <div class="artwork-popup__pagination artwork-second__pagination"></div>
        <div class="artwork-popup__pagination artwork-second__pagination"></div>
      </div>
      <p class="artwork-popup__text">
        Step 2 from 3
      </p>
      <h3 class="artwork-popup__subtitle">
        Censor the public version of artwork, if it contains 18+ content
      </h3>

      <div class="artwork-second__img-wrapper">
        <img v-bind:src="photoFile" alt="photo">
      </div>
      <div class="artwork-second__svg-wrapper">
        <BaseSvg id="artwork-second-left"/>
        <BaseSvg id="artwork-second-center"/>
        <BaseSvg id="artwork-second-right"/>
      </div>

      <div class="artwork-popup__button">
        <UIButton @click="openThirdArtworkPopup">
          Next step
        </UIButton>
      </div>
    </UIPopup>

    <UIPopup v-if="isOpenThirdArtworkPopup">
      <BaseSvg :id="'cross'" @click="closeThirdArtworkPopup" class="popup__cross-icon"/>

      <h3 class="popup__text artwork-popup__popup-text">Creating artwork</h3>
      <div class="artwork-popup__pagination-wrapper">
        <div class="artwork-popup__pagination artwork-third__pagination"></div>
        <div class="artwork-popup__pagination artwork-third__pagination"></div>
        <div class="artwork-popup__pagination artwork-third__pagination"></div>
      </div>
      <p class="artwork-popup__text">
        Step 3 from 3
      </p>

      <form class="artwork-third__form">
        <label for="artworkName">Artwork name</label>
        <input class="artwork-third__form-input" type="text"/>

        <div class="artwork-third__form-textarea">
          <label for="artworkDescription">Description</label>
          <textarea class="artwork-third__form-description"/>
        </div>

        <p class="artwork-third__form-text">
          Type
        </p>
        <div class="artwork-third__form-radio-buttons">
          <div class="artwork-third__form-radio-button-wrapper">
            <input type="radio" class="artwork-third__form-radio-button" id="auction" name="artwork-type" checked>
            <span>Auction</span>
          </div>
          <div class="artwork-third__form-radio-button-wrapper">
            <input type="radio" class="artwork-third__form-radio-button" id="sale" name="artwork-type">
            <span>Sale</span>
          </div>
        </div>

        <div class="artwork-third__form-sums">
          <div class="artwork-third__form-sum">
            <p>Copies</p>
            <div class="artwork-third__form-sum-buttons">
              <button @click.prevent="currentNum > 1 ? currentNum -= 1 : currentNum" :class="{ 'grey-button': currentNum === 1 }">-</button>
              <p>{{ currentNum }}</p>
              <button @click.prevent="currentNum < 9 ? currentNum += 1 : currentNum" :class="{ 'grey-button': currentNum === 9 }">+</button>
            </div>
          </div>
          <div class="artwork-third__form-sum">
            <UIInputSum :text = '"Min.sum"' :sum = '"(1308.54$)"' :input-text = '"TASTE"' v-model="inputValue"/>
          </div>
        </div>

        <p class="artwork-third__form-text-bottom">Selling will end</p>

        <UIButtonText v-if="!isDate" class="artwork-third__form-button" @click="isDate = true">Set timer</UIButtonText>

        <div v-if="isDate" class="artwork-third__form-date">
<!--          <input type="date" class="artwork-third__form-date-date">-->
          <VueDatePicker class="artwork-third__form-date-date" v-model="date" mode="date"></VueDatePicker>
<!--          <input type="time" class="artwork-third__form-date-time">-->
          <p>05h 02m 41s</p>
          <UIButtonText class="artwork-third__form-button-text" @click="isDate = false">
            <BaseSvg class="artwork-third__form-date-button" id="button-cross"></BaseSvg>
            delete file
          </UIButtonText>
        </div>

        <div class="artwork-popup__button">
          <UIButton @click="createNft">
            Finish creating
          </UIButton>
        </div>
      </form>
    </UIPopup>

    <UIPopup v-if="isPopupOpen" @closePopup="closePopup">
      <BaseSvg :id="'cross'" @click="closePopup" class="popup__cross-icon"/>

      <h3 class="popup__text">Connecting wallet</h3>

      <div class="did-wallet__cards">
        <BaseSvg v-if="isVideoOpen" :id="'cross'" @click="closeVideo" class="popup__cross-icon"/>
        <div v-for="(card, index) in cards" :key="card.number" class="did-wallet__card" @click="currentVideo(index)">
          <p class="did-wallet__card-num">{{ card.number + '.' }}</p>
          <div class="did-wallet__card-video" :id="'video-container-' + index">
            <PictureComponent :srcset="cards[index].img.webP"  :src="cards[index].img.default" :alt="'video'" />
            <div class="did-wallet__card-svg-container">
              <BaseSvg :id="'play'"/>
            </div>
          </div>

          <p class="did-wallet__card-text">
            {{ card.description }}
          </p>

        </div>
      </div>
      <UIButton @click="openSecondPopup" class="did-wallet__button">
        Connect wallet
      </UIButton>
    </UIPopup>

    <UIPopup v-if="isPopupSecondOpen" @closePopup="closeSecondPopup">
      <BaseSvg @click="closeSecondPopup" class="popup__cross-icon" :id="'cross'"/>

      <h3 class="popup__text">Connecting wallet</h3>

      <div class="popup__init-icon">
        <div class="popup__init-progress-icon">
          <BaseSvg :id="'progress'"/>
        </div>
        <BaseSvg :id="'init-icon'"/>
      </div>

      <p class="popup__init-text">
        Initializing
      </p>
    </UIPopup>

  </header>
  <UIPopup class="form__popup" v-if="isPopupThirdOpen">
    <BaseSvg @click="closeThirdPopup" class="popup__cross-icon" :id="'cross'"/>

    <h3 class="popup__text">Edit your Profile</h3>

    <form class="form" @submit.prevent="submitForm">
      <div class="form__top-wrapper">
        <div class="form__top">
          <label for="name">Name</label>
          <input class="form__top-input" type="text" id="name" v-model="formInput.name" @input="onInput('name', $event.target.value)"/>
          <span style="color: red;">{{ errorMessages.name }}</span>
        </div>
        <div class="form__top">
          <label for="name">Username</label>
          <div class="form__top-input-wrapper">
            <p class="form__top-symbol"> @ </p>
            <input class="form__top-input form__top-input-symbol" type="text" id="userName" v-model="formInput.userName" @input="onInput('userName', $event.target.value)" />
          </div>
          <span style="color: red;">{{ errorMessages.userName }}</span>
        </div>
      </div>
      <div class="form__top-wrapper">
        <div class="form__top">
          <label for="name">Email</label>
          <input class="form__top-input" type="text" id="email" v-model="formInput.email" @input="onInput('email', $event.target.value)"/>
          <span style="color: red;">{{ errorMessages.email }}</span>
        </div>
        <div class="form__top">
          <p>Add your email address to receive notifications about your activity on Foundation. This will not be shown on your profile.
          </p>
        </div>
      </div>

      <div class="form__top">
        <label for="name">BIO</label>
        <textarea class="form__top-input form__top-input-bio" id="bio" v-model="formInput.bio" @input="onInput('bio', $event.target.value)"/>
        <span style="color: red;">{{ errorMessages.bio }}</span>
      </div>

      <div class="form__profile">
        <label for="name">Profile image</label>
        <div class="form__top-contents">
          <div class="form-top-content">
            <PictureComponent :srcset="userPhotoSrcset"  :src="userPhotoSrc" :alt="'user-photo'" />
          </div>
          <div class="form__top-content">
            <p>file.name</p>
            <p>5.00 mb</p>
            <button class="form__top-button"> <BaseSvg :id="'button-cross'"/> delete file</button>
          </div>
        </div>
      </div>

      <div class="form__contacts">
        <p class="form__contacts-text">Contacts</p>
        <div class="form__top-input-wrapper form__bottom-input-wrapper">
          <p class="form__top-symbol"> <BaseSvg :id="'twich'"/> Twitch </p>
          <input class="form__top-input form__top-input-contact" type="text"/>
        </div>
        <div class="form__top-input-wrapper form__bottom-input-wrapper">
          <p class="form__top-symbol"> <BaseSvg :id="'instagram'"/> Instagram </p>
          <input class="form__top-input form__top-input-contact" type="text"/>
        </div>
        <div class="form__top-input-wrapper form__bottom-input-wrapper">
          <p class="form__top-symbol"> <BaseSvg :id="'twitter'"/> Twitter </p>
          <input class="form__top-input form__top-input-contact" type="text"/>
        </div>
        <div class="form__top-input-wrapper form__bottom-input-wrapper">
          <p class="form__top-symbol"> <BaseSvg :id="'onlyfans'"/> Onlyfans </p>
          <input class="form__top-input form__top-input-contact" type="text"/>
        </div>
      </div>

      <div class="form__button-wrapper">
        <UIButton :class="{'disabled': !isValid}" class="form__button" type="submit">Save changes</UIButton>
      </div>

    </form>

  </UIPopup>

</template>

<script setup>
import UIInput from "@/components/UI/UIInput.vue";
import UIButton from "@/components/UI/UIButton.vue";
import UIPopup from "@/components/UI/UIPopup.vue";
import BaseSvg from '@/components/Base/BaseSvg.vue';
import PictureComponent from "@/components/Base/PictureComponent.vue";
import { object, string } from "yup";
import { reactive } from "vue";
import { ref, onMounted } from 'vue';
import UIDropdownUser from "@/components/UI/UIDropdownUser.vue";
import UIButtonText from "@/components/UI/UIButtonText.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import UIInputSum from "@/components/UI/UIInputSum.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';


const searchQuery = ref('');
const emit = defineEmits('clearInput');
const inputValue = ref('');

function clearInputValue() {
  searchQuery.value = '';
  emit('clearInput');
}

const logoSrc = new URL('../../assets/image/logo.png', import.meta.url);
const logoSrcset = new URL('../../assets/image/logo.webp', import.meta.url);
const logo2Src = new URL('../../assets/image/logo2.png', import.meta.url);
const logo2Srcset = new URL('../../assets/image/logo2.webp', import.meta.url);
const photoSrcLeft = new URL('../../assets/image/youtubeVideo/left.png', import.meta.url);
const photoSrcsetLeft = new URL('../../assets/image/youtubeVideo/left.webp', import.meta.url);
const photoSrcCenter = new URL('../../assets/image/youtubeVideo/center.png', import.meta.url);
const photoSrcsetCenter = new URL('../../assets/image/youtubeVideo/center.webp', import.meta.url);
const photoSrcRight = new URL('../../assets/image/youtubeVideo/right.png', import.meta.url);
const photoSrcsetRight = new URL('../../assets/image/youtubeVideo/right.webp', import.meta.url);
const userPhotoSrc = new URL('../../assets/image/user-logo.png', import.meta.url);
const userPhotoSrcset = new URL('../../assets/image/user-logo.webp', import.meta.url);
const logoSoldSrc = new URL('../../assets/image/logo-sold.png', import.meta.url);
const logoSoldSrcset = new URL('../../assets/image/logo-sold.webp', import.meta.url);
const logoWithdrownSrc = new URL('../../assets/image/logo-card.png', import.meta.url);
const logoWithdrownSrcset = new URL('../../assets/image/logo-card.webp', import.meta.url);


const cards = [
  {number: 1, description: 'Описание что нужно сделать', youTubeLink: 'https://www.youtube.com/watch?v=OlnwgS-gk8Y', img: { default: photoSrcLeft, webP: photoSrcsetLeft }},
  {number: 2, description: 'Описание что нужно сделать', youTubeLink: 'https://www.youtube.com/watch?v=c2SK1IlmYL8', img: { default: photoSrcCenter, webP: photoSrcsetCenter }},
  {number: 3, description: 'Описание что нужно сделать', youTubeLink: 'https://www.youtube.com/watch?v=eEF6Szpda9g', img: { default: photoSrcRight, webP: photoSrcsetRight }},
]

let isPopupOpen = ref(false);
let isPopupSecondOpen = ref(false);
let isPopupThirdOpen = ref(false);
const isVideoOpen = ref(false);
let currentVideoIndex = null;
let currentVideoPlay = null;
let isOpenArtworkPopup = ref(false);
let isOpenSecondArtworkPopup = ref(false);
let isOpenThirdArtworkPopup = ref(false);
const isAuthorization = ref(false);
let currentNum = ref(1);
const isDate = ref(false);
const photoInput = ref(null);
const photoFile = ref(null);
const file = ref(null);
const isOpenBalancePopup = ref(false);
const sold = ref('');
const isOpenWithrowPopup = ref(false);
const isOpenSwapPopup = ref(false);
const isOpenDepositPopup = ref(false);
const date = ref(new Date());
const isOpenPopup = ref(false);
const isValid = ref(true);
let hasSubmitted = false;
let openThirdPopupTimeout;

function togglePopup() {
  if(isOpenPopup.value) {
    disableBodyScroll();
  } else {
    enableBodyScroll();
  }
}

const updateDate = (newDate) => {
  date.value = newDate;
};

function closeBalancePopup() {
  isOpenBalancePopup.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function openSwapPopup() {
  isOpenSwapPopup.value = true;
  isOpenBalancePopup.value = false;
  isOpenPopup.value = true;
  togglePopup();
}

function closeSwapPopup() {
  isOpenSwapPopup.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function openDepositPopup() {
  isOpenDepositPopup.value = true;
  isOpenBalancePopup.value = false;
  isOpenPopup.value = true;
  togglePopup();
}

function closeDepositPopup() {
  isOpenDepositPopup.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function openWithrowPopup() {
  isOpenWithrowPopup.value = true;
  isOpenBalancePopup.value = false;
  isOpenPopup.value = true;
  togglePopup();
}

function closeWithrowPopup() {
  isOpenWithrowPopup.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function backWithrow() {
  isOpenWithrowPopup.value = false;
  isOpenBalancePopup.value = true;
}

function backDeposit() {
  isOpenDepositPopup.value = false;
  isOpenBalancePopup.value = true;
}

function backSwap() {
  isOpenSwapPopup.value = false;
  isOpenBalancePopup.value = true;
}

function withrowConfirm() {
  isOpenWithrowPopup.value = false;
  toast('withrow confirm');
  isOpenPopup.value = false;
  togglePopup();
}

function swapButton() {
  isOpenSwapPopup.value = false;
  toast('swap');
  isOpenPopup.value = false;
  togglePopup();
}

function depositButton() {
  isOpenDepositPopup.value = false;
  toast('deposit');
  isOpenPopup.value = false;
  togglePopup();
}

function cardSold(value) {
  sold.value = value;
}

function addPhoto() {
  photoInput.value.click();
}

function handleFileChange(event) {
  file.value = event.target.files[0];

  photoFile.value = URL.createObjectURL(file.value);
}

function handleOpenPopup() {
  isOpenBalancePopup.value = true;
}

const errorMessages = reactive({
  name: '',
  email: '',
  userName: '',
  bio: ''
});

const formInput = reactive({
  name: "",
  email: "",
  userName: "",
  bio: "",
});


const nameSchema = object({
  name: string().required().max(15),
});

const emailSchema = object({
  email: string()
      .required('Email is required')
      .matches(
          /^[a-zA-Z0-9.-]+@[^\s@]+\.[a-zA-Z]{2,}$/,
          'Invalid email format'
      )
});

const userNameSchema = object({
  userName: string().required().max(12),
});

const bioSchema = object({
  bio: string().required().max(200),
});

const validateForm = () => {
  isValid.value = true;

  try {
    nameSchema.validateSync({ name: formInput.name });
    errorMessages.name = '';
  } catch (error) {
    errorMessages.name = error.message;
    isValid.value = false;
  }

  try {
    emailSchema.validateSync({ email: formInput.email });
    errorMessages.email = '';
  } catch (error) {
    errorMessages.email = error.message;
    isValid.value = false;
  }

  try {
    userNameSchema.validateSync({ userName: formInput.userName });
    errorMessages.userName = '';
  } catch (error) {
    errorMessages.userName = error.message;
    isValid.value = false;
  }

  try {
    bioSchema.validateSync({ bio: formInput.bio });
    errorMessages.bio = '';
  } catch (error) {
    errorMessages.bio = error.message;
    isValid.value = false;
  }

  return isValid.value;
};

const onInput = (fieldName, value) => {
  if(hasSubmitted) {
    formInput[fieldName] = value;
    validateForm();
  }

};

const submitForm = () => {
  if (validateForm()) {
    isPopupThirdOpen.value = false;
    isAuthorization.value = true;
    isOpenPopup.value = false;
    togglePopup();
    localStorage.setItem('isAuthorization', 'true');
  } else {
    hasSubmitted = true;
  }
};

onMounted(() => {
  const storedAuth = localStorage.getItem('isAuthorization');
  if (storedAuth === 'true') {
    isAuthorization.value = true;
  }
});

function openPopup() {
  isPopupOpen.value = true;
  isOpenPopup.value = true;
  togglePopup();
}

function closePopup() {
  isPopupOpen.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function closeSecondPopup() {
  isPopupSecondOpen.value = false;
  isOpenPopup.value = false;
  togglePopup();

  clearTimeout(openThirdPopupTimeout);
}

function closeThirdPopup() {
  isPopupThirdOpen.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function openSecondPopup() {
  closePopup();
  isPopupSecondOpen.value = true;
  isOpenPopup.value = true;
  togglePopup();

  openThirdPopupTimeout = setTimeout(() => {
    closeSecondPopup();
    isPopupThirdOpen.value = true;
    isOpenPopup.value = true;
    togglePopup();
  }, 2000);
}

function currentVideo(index) {
  const card = cards[index];
  if (card && card.youTubeLink) {
    if (currentVideoIndex !== null && currentVideoIndex !== index) {
      closeVideo();
    }

    const videoId = card.youTubeLink.split('v=')[1];
    const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
    const iframeElement = document.createElement('iframe');
    iframeElement.setAttribute('src', iframeUrl);
    iframeElement.setAttribute('allowfullscreen', true);
    const videoContainerId = 'video-container-' + index;
    const videoContainer = document.getElementById(videoContainerId);

    currentVideoPlay = videoContainer.innerHTML;
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframeElement);
    isVideoOpen.value = true;
    currentVideoIndex = index;
  } else {
    console.error('Нет ссылки на YouTube для этой карточки');
  }
}


function closeVideo() {
  if (currentVideoIndex !== null) {
    const videoContainerId = 'video-container-' + currentVideoIndex;
    const videoContainer = document.getElementById(videoContainerId);

    videoContainer.innerHTML = '';
    isVideoOpen.value = false;

    if (currentVideoPlay) {
      videoContainer.innerHTML = currentVideoPlay;
    }

    currentVideoIndex = null;
  }
}

function exit() {
  localStorage.removeItem('isAuthorization');
  localStorage.removeItem('startTime');
  toast('Сброшено время окончания аукциона');
  isAuthorization.value = false
}

function openArtworkPopup() {
  isOpenArtworkPopup.value = true;
  isOpenPopup.value = true;
  togglePopup();
}

function closeArtworkPopup() {
  isOpenArtworkPopup.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function openSecondArtworkPopup() {
  closeArtworkPopup();
  isOpenSecondArtworkPopup.value = true;
  isOpenPopup.value = true;
  togglePopup();
}

function closeSecondArtworkPopup() {
  isOpenSecondArtworkPopup.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function openThirdArtworkPopup() {
  closeSecondArtworkPopup();
  isOpenThirdArtworkPopup.value = true;
  isOpenPopup.value = true;
  togglePopup();
}

function closeThirdArtworkPopup() {
  isOpenThirdArtworkPopup.value = false;
  isOpenPopup.value = false;
  togglePopup();
}

function createNft() {
  toast('Нфт добавлена');
  isOpenPopup.value = false;
  togglePopup();
  closeThirdArtworkPopup();
}

</script>


<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.header {
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #30363D;
  border-radius: 0 0 32px 32px;
  min-height: 56px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  padding: 5px 24px;
  margin-bottom: 40px;

  @include media-breakpoint-down(xs) {
    padding: 5px 10px;
  }

  &__left{
    display: flex;
    align-items: center;
    gap: 26px;
    width: calc(100% - 142px);

    @include media-breakpoint-down(xs) {
      gap: 5px;
      width: calc(100% - 110px);
    }
  }

  &__left-authorization {
    display: flex;
    align-items: center;
    gap: 26px;
    width: calc(100% - 392px);

    @include media-breakpoint-down(sm) {
      width: calc(100% - 210px);
    }

    @include media-breakpoint-down(xs) {
      width: calc(100% - 178px);
      gap: 5px;
    }

    @include media-breakpoint-down(xxs) {
      width: calc(100% - 124px);
      gap: 5px;
    }
  }


  &__authorization {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
  }

  &__button {
    font-size: 12px;
    padding: 10px 20px;

    @include media-breakpoint-down(xs) {
      padding: 10px 6px;
    }

  }
}

.form {
  &__top-wrapper {
    display: flex;
    gap: 21px;
    margin-bottom: 47px;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      margin-bottom: 0;
    }
  }

  &__top {
    position: relative;

    @include media-breakpoint-down(sm) {
      margin-bottom: 50px;
    }

    p {
      font-weight: 500;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      max-width: 295px;
    }

    label {
      position: absolute;
      top: -24px;
      font-weight: 600;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }

    span {
      position: absolute;
      left: 0;
      bottom: -20px;
    }
  }

  &__top-symbol {
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__top-input {
    width: 294px;
    height: 40px;
    border-radius: 8px;
    background: #1d2228;
    padding: 0 20px;
    color: #fff;

    @include media-breakpoint-down(sm) {
      width: 100%;
    }

  }

  &__top-input-symbol {
    width: 266px;

    @include media-breakpoint-down(sm) {
      width: 100%;
    }
  }

  &__top-input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    margin-bottom: 10px;

    @include media-breakpoint-down(sm) {
      justify-content: start;
    }
  }

  &__bottom-input-wrapper {
    @include media-breakpoint-down(sm) {
      justify-content: space-between;
    }
  }


  &__top-input-bio {
    width: 100%;
    height: 120px;
    padding: 20px;
    resize: none;
  }


  &__popup {
    h3 {
      margin-bottom: 60px;
    }
  }

  &__profile {
    width: 294px;
    height: 120px;
    border-radius: 16px;
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
    background: #1d2228;
    padding: 20px;
    position: relative;
    margin-top: 54px;
    margin-bottom: 27px;

    @include media-breakpoint-down(xxs) {
      width: 100%;
    }

    label {
      position: absolute;
      top: -30px;
      left: 0;
      font-weight: 600;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__top-contents {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__top-content {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__top-button {
    background: transparent;
    font-weight: 500;
    font-size: 16px;
    color: #ff5e54;
    cursor: pointer;

    svg {
      width: 11px;
      height: 11px;
    }
  }

  &__top-input-contact {
    width: 100%;
    max-width: 504px;
  }

  &__contacts .form__top-symbol {
    font-weight: 400;
    font-size: 14px;
    line-height: 129%;

    @include media-breakpoint-down(sm) {
      width: 184px;
    }


  }

  &__contacts {
    p {
      font-weight: 600;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__contacts-text {
    margin-bottom: 8px;
  }

  &__button-wrapper {
    text-align: center;
    margin-top: 20px;
  }

  &__button {
    padding: 12px 32px;
  }

}

.artwork-popup {
  padding: 36px 26px;

  &__pagination-wrapper {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-bottom: 16px;
  }

  &__pagination {
    border-radius: 12px;
    width: 150px;
    height: 5px;
    background: rgba(255, 255, 255, 0.2);

    &:first-child{
      background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
    }
  }

  &__text {
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 20px;
  }

  &__popup-text {
    margin-top: 10px;
  }

  &__subtitle {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 14px;
  }

  &__img-wrapper {
    height: 360px;
    width: 100%;
    border: 1px dashed #c4c4c4;
    border-radius: 16px;
    position: relative;
    margin-bottom: 32px;

    @include media-breakpoint-down(xs) {
      height: 280px;
    }

    @include media-breakpoint-down(xxs) {
      height: 180px;
    }
  }

  &__img-formats {
    font-weight: 400;
    font-size: 14px;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -58%);

  }

  &__img-format {
    margin-bottom: 4px;
  }

  &__img-text {
    width: 100%;
    margin: 30px auto 0;
  }

  &__button {
    text-align: center;

    button {
      padding: 12px 48px;
    }
  }
}

.artwork-second {
  &__pagination {
    &:nth-last-child(2){
      background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
    }
  }

  &__img-wrapper {
    margin-bottom: 16px;
    width: 599px;
    height: 599px;

    @include media-breakpoint-down(sm) {
      max-width: 599px;
      max-height: 599px;
      width: unset;
      height: unset;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__svg-wrapper {
    display: flex;
    gap: 20px;
    margin-bottom: 32px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

.artwork-third {
  &__pagination {
    background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  }

  &__form {
    label {
      font-weight: 600;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 8px;
    }
  }

  &__form-text {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 12px;
  }

  &__form-input {
    padding: 10px 20px;
    margin-top: 8px;
    margin-bottom: 24px;
  }

  &__form-description {
    width: 100%;
    height: 120px;
    border-radius: 12px;
    background: #1D2228;
    color: rgba(255, 255, 255, 0.5);
    padding: 10px 20px;
    margin-top: 8px;
    margin-bottom: 24px;
    resize: none;
  }

  &__form-radio-button-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      font-weight: 600;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__form-sum-buttons {
    display: flex;
    gap: 11px;
    align-items: center;
    margin-top: 8px;

    button {
      font-weight: 700;
      font-size: 40px;
      color: #fff;
      background: transparent;
    }

    p {
      font-weight: 600;
      font-size: 16px;
      width: 10px;
      color: #fff !important;
    }
  }

  &__form-sums {
    display: flex;
    gap: 30px;
    margin-bottom: 24px;

    @include media-breakpoint-down(xs) {
      flex-direction: column;
      align-items: start;
    }
  }

  &__form-sum-input {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 8px;
    position: relative;

    @include media-breakpoint-down(xs) {
      align-items: start;
    }

    input {
      padding: 10px;
      width: 177px;
    }
  }

  &__form-input-text {
    position: absolute;
    top: 12px;
    left: 118px;

    @include media-breakpoint-down(xxs) {
      left: 155px;
    }
  }

  &__form-sum {
    p {
      font-weight: 600;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__form-button {
    font-weight: 600;
    font-size: 16px;
    background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 32px;
    height: 40px;
  }

  &__form-text-bottom {
    font-weight: 600;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 16px;
  }

  &__form-date-button {
    width: 11px;
    height: 11px;
  }

  &__form-button-text {
    font-weight: 500;
    font-size: 16px;
    color: #ff5e54;
  }

  &__form-date {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;

    @include media-breakpoint-down(xs) {
      flex-direction: column;
      align-items: start;
      gap: 12px;
    }


    p {
      margin-left: 4px;
      margin-right: 9px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__form-date-date {
    width: 200px;
  }

  &__form-date-time {
    padding: 0 10px;
    width: 90px;
  }

}

.artwork-third__form-radio-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.artwork-third__form-radio-button {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  background: #30363d;
  position: relative;

}


.artwork-third__form-radio-button::before {
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.artwork-third__form-radio-button:hover::before {
  background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
}

.artwork-third__form-radio-button:checked {
  border: 1px solid #8743ff;
}

.artwork-third__form-radio-button:checked::before {
  background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
}

.grey-button {
  color: rgba(255, 255, 255, 0.5) !important;
}

input:-webkit-autofill{
  -webkit-text-fill-color: #fff !important;
  -webkit-box-shadow: 0 0 0px 1000px #1d2228 inset;
}

.button_disabled {
  pointer-events: none;
  opacity: 0.2;
}

.balance-popup {
  width: 294px;
  height: 101px;
  border-radius: 16px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  background: #1d2228;
  padding: 22px 15px 17px 15px;

  @include media-breakpoint-down(sm) {
    height: 154px;
  }

  @include media-breakpoint-down(xxs) {
    padding: 17px 10px;
  }

  &__wrapper {
    display: flex;
    gap: 17px;
  }

  &__top {
    img {
      width: 32px;
    }

    button {
      font-weight: 400;
      font-size: 14px;
      color: #ff5693;
      background: transparent;
    }
  }

  &__top-img {
    font-weight: 700;
    font-size: 32px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;

    @include media-breakpoint-down(xxs) {
      font-size: 26px;
    }
  }

  &__top-buttons {
    display: flex;
    gap: 13px;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}

.popup__arrow-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 52px;
  left: 48px;
  cursor: pointer;

  @include media-breakpoint-down(sm) {
    top: 33px;
    left: 17px;
  }
}

.withrow-popup {
  &__button {
    text-align: center;

    button {
      width: 157px;
      height: 40px;
      margin-top: 32px;
    }
  }
}

.dp__input {
  background-color: #1D2228;
  border: none;
  color: #fff;
}

.dp__menu {
  background: linear-gradient(298deg, #8743ff 90%, #d8c2ff 100%) !important;
}


</style>