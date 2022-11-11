// ==UserScript==
// @name         YouTube 自動翻訳 日本語選択
// @namespace    https://next.waterleaper.net/
// @version      0.1
// @description  YouTubeの自動翻訳を日本語に設定します。
// @author       waterleaper
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/favicon.ico
// @grant        none
// @license MIT
// ==/UserScript==

;(function () {
  "use strict"

  // 字幕ボタン
  const subBtn = document.querySelector(
    "button.ytp-subtitles-button.ytp-button"
  )

  const autoSelect = () => {
    const settingsBtn = document.querySelector(
      "button.ytp-button.ytp-settings-button.ytp-hd-quality-badge"
    )
    settingsBtn.click()
    const subBtn = document.querySelector(
      "#ytp-id-18 > div > div > div:nth-child(4) > div.ytp-menuitem-content"
    )
    subBtn.click()
    const langBtns = document.querySelectorAll(
      "#ytp-id-18 > div > div.ytp-panel-menu > div"
    )
    langBtns.forEach((lang) => {
      if (lang.querySelector(".ytp-menuitem-label").innerHTML === "自動翻訳") {
        lang.click()
      }
    })

    const autoLangBtns = document.querySelectorAll(
      "#ytp-id-18 > div > div.ytp-panel-menu > div"
    )
    autoLangBtns.forEach((lang) => {
      if (lang.querySelector(".ytp-menuitem-label").innerHTML === "日本語") {
        lang.click()
      }
    })
  }

  document.addEventListener("keydown", (event) => {
    // 字幕有効フラグ
    const subBtnEnabled = subBtn.getAttribute("aria-pressed")
    if (
      event.isComposing ||
      (event.ctrlKey && event.shiftKey && event.code === "KeyC")
    ) {
      console.log(subBtnEnabled)
      // 字幕が有効なら
      if (subBtnEnabled === true || subBtnEnabled !== null) {
        autoSelect()
        // 字幕が無効なら
      } else {
        subBtn.click()
        setTimeout(() => {
          autoSelect()
        }, 1000)
      }
    }
  })
})()
