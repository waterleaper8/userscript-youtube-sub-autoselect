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
      "button.ytp-button.ytp-settings-button"
    )
    settingsBtn.click()

    const settingItems = document.querySelectorAll(
      ".ytp-panel-menu > .ytp-menuitem"
    )
    setTimeout(() => {
      settingItems.forEach((item) => {
        try {
          if (item.querySelector("span").innerHTML === "字幕") {
            item.click()
          }
        } catch (e) {}
      })
    }, 1000)

    setTimeout(() => {
      const langBtns = document.querySelectorAll(
        ".ytp-panel-menu > .ytp-menuitem"
      )
      langBtns.forEach((lang) => {
        // 字幕に日本語があった場合
        if (lang.querySelector(".ytp-menuitem-label").innerHTML === "日本語") {
          lang.click()
          // 設定を閉じる
          let KEvent = new KeyboardEvent("keydown", { keyCode: 27 })
          document.dispatchEvent(KEvent)
          return
          // 字幕に日本語がなかった場合
        } else {
          langBtns.forEach((lang) => {
            // 英語を選択
            if (
              lang.querySelector(".ytp-menuitem-label").innerHTML === "英語"
            ) {
              lang.click()

              // 言語選択ボタンをクリック
              const settingItems2 = document.querySelectorAll(
                ".ytp-panel-menu > .ytp-menuitem"
              )
              setTimeout(() => {
                settingItems2.forEach((item) => {
                  try {
                    if (item.querySelector("span").innerHTML === "字幕") {
                      item.click()
                    }
                  } catch (e) {}
                })
              }, 1000)

              // 自動翻訳を選択
              setTimeout(() => {
                const langBtns = document.querySelectorAll(
                  ".ytp-panel-menu > .ytp-menuitem"
                )
                langBtns.forEach((lang) => {
                  if (
                    lang.querySelector(".ytp-menuitem-label").innerHTML ===
                    "自動翻訳"
                  ) {
                    lang.click()
                  }
                })
              }, 1500)

              // 日本語を選択
              setTimeout(() => {
                const autoLangBtns = document.querySelectorAll(
                  ".ytp-panel-menu > .ytp-menuitem"
                )
                autoLangBtns.forEach((lang) => {
                  if (
                    lang.querySelector(".ytp-menuitem-label").innerHTML ===
                    "日本語"
                  ) {
                    lang.click()
                  }
                })
              }, 2000)
            }
          })
        }
      })
    }, 1500)
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
        autoSelect()
      }
    }
  })
})()
