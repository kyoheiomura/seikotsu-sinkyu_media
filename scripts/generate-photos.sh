#!/bin/bash
# ダミー期間用の写真を AI（Codex 組み込みの image_gen / gpt-image-2）で生成する。
# 人物の顔は作らない（作り物の質感が出るため）。手元・道具・施術室だけ。
# ChatGPT サブスクリプションの範囲で動く（API キー不要・従量課金なし）。
# Codex に承認とサンドボックスを外す権限を渡すので、内容を確認してから手動で実行すること:
#   bash "/Users/kyoheiomura/BtoC_service/サイト制作/shinkyu-seitai/scripts/generate-photos.sh"
set -u
cd "$(dirname "$0")/.."

STYLE="Photorealistic editorial photograph, NO people's faces visible, no text, no logos, no watermark. Bright, quiet Japanese acupuncture and bodywork treatment room: white walls, light wood, white and pale teal towels, soft natural window light, green potted plants softly blurred, shallow depth of field, calm and hygienic, high-end magazine photography, natural textures."

gen() { # gen <出力パス> <サイズ> <プロンプト>
  codex exec --dangerously-bypass-approvals-and-sandbox --cd "$PWD" "Codex 組み込みの image_gen ツール（gpt-image-2）を直接呼んで画像を1枚作ってください。
API キーも Python/Node スクリプトも不要です。

プロンプト: '$3'
サイズ: $2
保存先: $1" > "/tmp/tanagokoro-gen-$(basename "$1").log" 2>&1
  file "$1"
}

D=public/images/sensei
gen public/images/room.png 2048x1152 "Wide shot of an empty treatment room with a treatment bed covered by a white sheet and a folded pale teal towel, positioned on the RIGHT half of the frame, generous calm empty wall space on the left. $STYLE" &
gen $D/kariok-ryo-shoulder.png 1536x1024 "Close-up of a practitioner's hands in navy sleeves gently resting on a client's shoulder over a white towel, seen from the side, faces out of frame. $STYLE" &
gen $D/mihon-hana-needles.png 1536x1024 "Close-up of a practitioner's hands preparing very fine acupuncture needles on a small wooden tray, faces out of frame. $STYLE" &
gen $D/kamei-ichiro-stretch.png 1536x1024 "Close-up of a practitioner's hands in white sleeves guiding the stretch of a client's arm, faces out of frame. $STYLE" &
wait
gen $D/reida-sakura-moxa.png 1536x1024 "Still life of small moxa cones, a ceramic dish and a folded white towel on natural linen, warm soft light. $STYLE" &
gen $D/kaku-takeshi-back.png 1536x1024 "Close-up of a practitioner's hands resting on a client's lower back over a white towel, faces out of frame. $STYLE" &
gen $D/shisaku-midori-shoulders.png 1536x1024 "Close-up from behind of a practitioner's hands in beige sleeves placed on a client's shoulders, faces out of frame. $STYLE" &
wait
echo "完了。public/images/ を確認してください。"
