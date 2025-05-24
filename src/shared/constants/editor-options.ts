export const EDITOR_CONTENT_STYLE =
  'body { font-family:Helvetica,Arial,sans-serif; background-color: transparent; font-size:14px; } body::before {font-size:13px; color: rgba(0,0,0,0.55)!important; ';
export const EDITOR_CONTENT_DARK_STYLE =
  'body { color: rgba(255,255,255); background-color: rgb(45,44,50); font-family: Helvetica, Arial, sans-serif; font-size: 14px; } body::before {font-size:13px; color: rgba(255,255,255,.55)!important; }';

export const EDITOR_OPTIONS = {
  content_css: 'default',
  content_style: EDITOR_CONTENT_STYLE,
  language: 'ru',
  min_height: 200,

  plugins: 'anchor autolink link fullscreen',
  skin: 'oxide',

  // 'tinydrive preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
  toolbar:
    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  valid_elements: '*[*],math[xmlns],svg[xmlns]',
};
