import { createRoot } from "react-dom/client";
import { TicketMap } from "./src";
import ticketGroups from "./src/__mocks__/data/ticket-groups.json";
import manifest from './manifest.json';

const rootE1 = document.getElementById("map");

if (!rootE1) {
    throw new Error("No element in html");
}

const root = createRoot(rootE1);

const svgSrc = `<?xml version="1.0" encoding="UTF-8"?>
<svg
   width="800"
   height="600"
   viewBox="0 0 800 600"
   id="svgroot"
   x="0px"
   y="0px"
   version="1.1"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs1">
    <pattern
       id="EMFhbasepattern"
       patternUnits="userSpaceOnUse"
       width="6"
       height="6"
       x="0"
       y="0" />
    <pattern
       id="EMFhbasepattern-8"
       patternUnits="userSpaceOnUse"
       width="6"
       height="6"
       x="0"
       y="0" />
    <pattern
       id="EMFhbasepattern-4"
       patternUnits="userSpaceOnUse"
       width="6"
       height="6"
       x="0"
       y="0" />
  </defs>
  <line
     id="qqqq"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="aaaa"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="jkljkljkljklkjl"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="drzr"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="bnbhjy"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="rtrertert"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="errtrt"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="gt"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="hh"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="dd"
     fill="none"
     stroke="#020202"
     class="mapnode" />
  <line
     id="tr2"
     fill="none"
     stroke="#FFFFFF"
     class="mapnode" />
  <line
     id="tr1"
     fill="none"
     stroke="#FFFFFF"
     class="mapnode" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="324.43768310546875, 531.210205078125 324.2366638183594, 550.912841796875 336.7015686035156, 560.76416015625 462.15496826171875, 560.362060546875 473.0115051269531, 551.1138916015625 473.0115051269531, 531.210205078125 466.1759033203125, 529.1997680664062 452.70574951171875, 524.977783203125 440.039794921875, 522.565185546875 422.34765625, 519.9515991210938 406.2638854980469, 518.7453002929688 390.38116455078125, 518.7453002929688 372.2868957519531, 519.9515991210938 352.58428955078125, 523.5704345703125 332.6806335449219, 528.3955688476562"
     id="ca34220c-29e3-4790-933c-038a25232bfd"
     class="mapnode"
     fill="#808080"
     data-section-id="Stage" />
  <path
     id="5a9bc4d5-bf5d-4081-b400-6f06042c97ba"
     class="mapnode"
     d="m 322.80078,420.44336 c -34.42981,6.27602 -65.50397,16.52908 -91.8789,27.59766 l 5.33593,12.19531 34.69141,37.31445 32.0664,19.82422 20.11524,-7.87109 z"
     fill="#808080"
     data-section-id="Orchestra Right BB-EE, A-F" />
  <path
     id="path6"
     class="mapnode"
     d="m 322.54688,349.79102 -16.32422,1.16601 -26.23633,6.12305 -28.86133,9.61914 -26.23633,11.07812 -15.44922,7.8711 -3.79101,2.62304 25.27344,57.76954 c 26.37493,-11.06858 57.44909,-21.32164 91.8789,-27.59766 z"
     fill="#808080"
     data-section-id="Orchestra Right G-H, J-N" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="322.34464,333.71744 332.54776,332.8429 331.96472,225.56415 301.06378,230.22844 268.41373,238.39096 245.38379,247.42802 248.29898,257.04813 216.81499,269.87494 217.98106,288.5321 209.81856,293.19641 210.11008,302.23346 217.10651,299.02676 217.68954,372.19788 232.8485,364.90991 262.29184,350.91702 299.31467,338.67325 "
     id="43d4e3ce-5288-4a59-9323-e952468727ed"
     data-section-id="Orchestra Right Q-Z, ZZ"
     class="mapnode"
     transform="translate(-10,-4)"
     fill="#808080" />
  <path
     id="56502d38-7c2f-4a2d-8752-9777170f7a6c"
     class="mapnode"
     d="M 455.29297 418.14062 C 414.52773 411.93517 375.71721 413.37667 340.26758 419.1543 L 339.8457 507.38086 L 353.00391 503.13672 L 367.85938 501.01562 L 388.23242 498.89258 L 409.87695 499.74219 L 437.04102 503.13672 L 454.86719 506.95703 L 455.29297 418.14062 z "
     fill="#808080"
     data-section-id="Orchestra Center BB-EE, A-F" />
  <path
     id="path5"
     fill="#808080"
     class="mapnode"
     d="m 455.62109,347.76758 c -40.77418,-6.15295 -79.58598,-4.66334 -115.02734,1.1543 l -0.32617,68.23242 c 35.44963,-5.77763 74.26015,-7.21912 115.02539,-1.01368 z"
     data-section-id="Orchestra Center G-H, J-N" />
  <path
     id="path9"
     fill="#808080"
     class="mapnode"
     d="m 392.90039,240.23242 -27.16406,0.84961 -20.37305,1.69727 2.54688,9.33789 -7.63868,0.42383 -0.42578,65.36328 4.24414,-1.27344 0.84961,8.06445 -4.24414,0.84961 -0.10156,21.37696 c 35.44136,-5.81764 74.25316,-7.30725 115.02734,-1.1543 l 0.0957,-19.79883 h -5.09375 l 2.12304,-9.33789 h 2.54688 l 0.84765,-64.08984 -7.21484,-0.84766 1.69727,-8.49024 -20.79688,-1.69726 -16.97656,-1.27344 z"
     data-section-id="Orchestra Center O-Y" />
  <path
     id="2dd7ad4d-0137-4919-8ca5-d3520d11cde6"
     class="mapnode"
     d="m 563.5957,449.14062 c -31.0139,-14.76963 -61.59416,-24.18613 -91.21094,-29.49414 l -0.33007,89.43164 20.11328,7.8711 32.06836,-19.82227 34.68945,-37.31445 z"
     fill="#808080"
     data-section-id="Orchestra Left BB-EE, A-F" />
  <path
     id="path7"
     class="mapnode"
     d="m 472.63672,349.36719 -0.25196,68.27929 c 29.61678,5.30801 60.19704,14.72451 91.21094,29.49414 l 25.93946,-59.29297 -3.78907,-2.62304 -15.45117,-7.8711 -26.23633,-11.07812 -28.85937,-9.62109 -26.23828,-6.1211 z"
     fill="#808080"
     data-section-id="Orchestra Left G-H, J-N" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="232.8485,364.90991 262.29184,350.91702 299.31467,338.67325 322.34464,333.71744 332.54776,332.8429 331.96472,225.56415 301.06378,230.22844 268.41373,238.39096 245.38379,247.42802 248.29898,257.04813 216.81499,269.87494 217.98106,288.5321 209.81856,293.19641 210.11008,302.23346 217.10651,299.02676 217.68954,372.19788 "
     id="5e08ceaf-ce15-474c-8448-9cb386056735"
     transform="matrix(-1,0,0,1,805.1846,-4.4244385)"
     data-section-id="Orchestra Left Q-Z, ZZ"
     class="mapnode"
     fill="#808080" />
  <path
     id="5539a86c-e1b1-4e79-88c0-c1b780359a62"
     fill="#808080"
     class="mapnode"
     d="M 228.22852 235.65039 L 231.58203 223.94336 C 220.48307 228.55587 210.20013 233.32172 200.83203 238.00977 L 200.95508 244.7168 C 209.05571 241.70835 218.14165 238.64027 228.22852 235.65039 z "
     data-section-id="Front Mezz Right BB" />
  <path
     id="path2"
     fill="#808080"
     class="mapnode"
     d="m 228.22852,237.65039 c -10.08687,2.98988 -19.17281,6.05796 -27.27344,9.06641 l 0.19922,10.87304 24.09961,-9.55664 z"
     data-section-id="Front Mezz Right AA" />
  <path
     id="path12"
     class="mapnode"
     d="m 322.06445,135.79688 -6.02539,0.41406 -16.82812,2.07812 -19.73438,3.74024 -19.94531,4.57031 -26.5918,7.68555 -19.32031,7.27148 3.74024,9.97266 -13.50391,4.77734 4.57031,17.86719 -8.31055,2.70117 0.7168,39.13477 c 9.3681,-4.68805 19.65104,-9.4539 30.75,-14.06641 l 4.26563,-14.88867 20.56836,-7.06446 -2.90821,-8.72461 12.46485,-3.5332 21.60546,-6.02344 17.24219,-3.5332 14.33594,-2.07617 2.9082,-0.62305 z"
     fill="#808080"
     data-section-id="Front Mezz Right CC-EE, A-D" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="332.47958,124.50002 331.64859,99.362434 320.63791,100.40118 307.54974,101.85542 290.09885,104.7639 273.47894,108.08788 256.44357,112.24285 238.16168,117.64432 228.39749,121.17605 229.85173,138.21144 214.89383,144.44389 219.87979,153.79259 232.34471,147.97563 252.49634,139.87343 273.68671,134.88747 297.78555,129.69374 320.84567,125.95427 "
     id="25b2d53a-7ed9-456b-b195-ea7205bcdd5d"
     data-section-id="Mid Mezz Right F-H"
     class="mapnode"
     transform="translate(-10,-4)"
     fill="#808080" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="327.07812,99.570183 331.85635,98.946938 332.27185,45.97102 319.59915,46.802017 295.29257,50.541492 271.40146,55.942959 252.91183,61.136677 246.26389,63.83741 249.17236,82.53479 222.16502,92.091232 222.78828,124.50002 231.72147,119.92956 249.17236,113.90485 269.11624,109.12663 290.09885,104.97165 311.49698,101.02442 "
     id="5f275e91-d60a-4533-9258-2d49cf78591b"
     data-section-id="Rear Mezz Right J-N"
     class="mapnode"
     transform="translate(-10,-4)"
     fill="#808080" />
  <path
     id="9c50a219-2ac9-4620-9856-83edfbaacf00"
     fill="#808080"
     class="mapnode"
     d="M 458.33789 168.58789 C 412.89813 163.40248 373.42261 164.27502 339.69141 168.57227 L 339.75 176.63281 L 349.72266 175.59375 L 364.47266 173.93164 L 378.59961 173.30859 L 395.84375 173.09961 L 417.86523 173.30859 L 437.59961 174.13867 L 450.68945 175.80078 L 458.16797 176.00977 L 458.33789 168.58789 z "
     transform="translate(0,-2)"
     data-section-id="Front Mezz Center A" />
  <path
     id="path8"
     fill="#808080"
     class="mapnode"
     d="m 402.49023,117.37109 -22.02148,0.20703 -19.11133,1.03907 -14.12695,0.83203 0.83008,9.76367 -8.51758,14.95703 0.14844,20.40235 c 33.7312,-4.29725 73.20672,-5.16979 118.64648,0.0156 l 0.45313,-19.79492 -8.31055,-15.78711 v -9.55664 l -8.10156,-1.24805 -18.49024,-0.62305 z"
     data-section-id="Front Mezz Center B-E" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="351.17697,123.24075 371.74408,122.20201 388.98724,121.78651 411.8396,121.78651 435.93845,122.40976 450.06534,123.24075 458.37531,123.86401 457.95981,98.518661 446.74136,97.272171 427.42075,95.817932 402.9064,95.402435 376.52231,95.817932 347.853,97.064423 339.95853,97.895416 339.95853,124.07175 "
     id="f6e81870-28ce-49d6-8cd4-5f9c6124fd2f"
     data-section-id="Mid Mezz Center F-H"
     class="mapnode"
     transform="translate(0,-4)"
     fill="#808080" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="351.8002,96.856674 369.45886,96.648926 389.40274,96.025681 410.59311,95.402435 427.83624,95.817932 444.45615,96.856674 455.88232,98.310913 457.75204,98.72641 458.16754,84.391754 450.6886,83.976257 438.84692,53.437195 422.22702,52.190704 397.71268,51.982956 374.86032,52.398453 362.18765,53.437195 360.11017,53.437195 348.47623,82.522011 339.75079,83.768509 340.16629,97.687668 "
     id="984ec809-7f79-4407-9d1f-a1f372d29b8b"
     data-section-id="Rear Mezz Center J-M"
     class="mapnode"
     transform="translate(0,-4)"
     fill="#808080" />
  <path
     id="b762a6b2-aaf2-4636-8f89-85f9b033bf33"
     fill="#808080"
     class="mapnode"
     d="m 567.88086,240.63281 2.12109,7.40039 24.09961,9.55664 0.15625,-8.56054 c -8.94365,-3.00612 -17.73607,-5.80167 -26.37695,-8.39649 z"
     data-section-id="Front Mezz Left AA" />
  <path
     id="path4"
     fill="#808080"
     class="mapnode"
     d="M 567.88086 238.63281 C 576.52174 241.22763 585.31416 244.02318 594.25781 247.0293 L 594.33984 242.56445 C 584.32867 236.62614 574.34372 231.28221 564.40234 226.48828 L 567.88086 238.63281 z "
     data-section-id="Front Mezz Left BB" />
  <path
     id="path13"
     class="mapnode"
     d="m 473.1914,135.79688 v 39.67968 l 2.90821,0.62305 14.33398,2.07617 17.24414,3.5332 21.60547,6.02344 12.46484,3.5332 -2.9082,8.72461 20.56641,7.06446 4.99609,17.43359 c 9.94138,4.79393 19.92633,10.13786 29.9375,16.07617 l 0.79883,-43.68945 -8.3086,-2.70117 4.57032,-17.86719 -13.50391,-4.77734 3.73828,-9.97266 -19.32031,-7.27148 -26.5918,-7.68555 -19.94336,-4.57031 -19.73633,-3.74024 -16.82812,-2.07812 z"
     fill="#808080"
     data-section-id="Front Mezz Left CC-EE, A-D" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="273.68671,134.88747 297.78555,129.69374 320.84567,125.95427 332.47958,124.50002 331.64859,99.362434 320.63791,100.40118 307.54974,101.85542 290.09885,104.7639 273.47894,108.08788 256.44357,112.24285 238.16168,117.64432 228.39749,121.17605 229.85173,138.21144 214.89383,144.44389 219.87979,153.79259 232.34471,147.97563 252.49634,139.87343 "
     id="347e7e42-e0df-44be-8665-2ef79d2849c3"
     transform="matrix(-1,0,0,1,805.25494,-4)"
     data-section-id="Mid Mezz Left F-H"
     class="mapnode"
     fill="#808080" />
  <polygon
     fill="#999999"
     stroke="#ffffff"
     points="269.11624,109.12663 290.09885,104.97165 311.49698,101.02442 327.07812,99.570183 331.85635,98.946938 332.27185,45.97102 319.59915,46.802017 295.29257,50.541492 271.40146,55.942959 252.91183,61.136677 246.26389,63.83741 249.17236,82.53479 222.16502,92.091232 222.78828,124.50002 231.72147,119.92956 249.17236,113.90485 "
     id="77fb076b-75fa-4203-bebd-caf29c1881c6"
     transform="matrix(-1,0,0,1,805.25494,-4)"
     data-section-id="Rear Mezz Left J-N"
     class="mapnode"
     fill="#808080" />
  <text
     fill="#ffffff"
     font-size="14"
     font-family="Helvetica"
     x="372.3001708984375"
     y="544.212890625"
     id="4ddfa744-7642-4248-be3b-2452002c561e"
     transform="matrix(1,0,0,1,0.893585205078125,1.787109375)"
     class="mapnode">STAGE</text>
  <text
     fill="#ffffff"
     font-size="12"
     font-family="Helvetica"
     x="370.5130920410156"
     y="364.6108093261719"
     id="2853d817-f726-4474-b33c-610b84f1e670"
     transform="matrix(1,0,0,1,-10.722503662109375,25.019195556640625)"
     class="mapnode">ORCHESTRA</text>
  <text
     fill="#ffffff"
     font-size="12px"
     font-family="Helvetica"
     x="378.55496"
     y="139.01221"
     id="b393e49b-9ed9-41f0-9edf-b5d1d1ebf439"
     class="mapnode">FRONT</text>
  <text
     fill="#ffffff"
     font-size="12px"
     font-family="Helvetica"
     x="365.15182"
     y="155.98952"
     id="ab8907a9-5412-4270-9ac9-a644ba38b8dd"
     class="mapnode">MEZZANINE</text>
  <text
     fill="#ffffff"
     font-size="10"
     font-family="Helvetica"
     x="358.00347900390625"
     y="111.73822021484375"
     id="9aa79cfd-4a7a-4db6-8cd3-f3a19bc320da"
     transform="matrix(1,0,0,1,0.8935546875,1.7870864868164062)"
     class="mapnode">MID MEZZANINE</text>
  <text
     fill="#ffffff"
     font-size="10"
     font-family="Helvetica"
     x="375.8743591308594"
     y="67.06108093261719"
     id="69e18ae3-970b-435d-b6a4-90c8ccfc073e"
     transform="matrix(1,0,0,1,8.0418701171875,2.680633544921875)"
     class="mapnode">REAR</text>
  <text
     fill="#ffffff"
     font-size="10"
     font-family="Helvetica"
     x="371.4066467285156"
     y="80.46422576904297"
     id="cdb0e995-d496-433d-9b7c-9892f880189e"
     transform="matrix(1,0,0,1,-1.787139892578125,5.361259460449219)"
     class="mapnode">MEZZANINE</text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="456.54172"
     y="509.82648"
     id="text18"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan19"
       x="456.54172"
       y="509.82648"
       style="font-size:10.6667px;fill:#000000">BB</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="500.37103"
     y="521.62683"
     id="text20"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan20"
       x="500.37103"
       y="521.62683"
       style="font-size:10.6667px;fill:#000000">BB</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="325.28665"
     y="511.61026"
     id="text21"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan21"
       x="325.28665"
       y="511.61026"
       style="font-size:10.6667px;fill:#000000">BB</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="457.70602"
     y="429.10202"
     id="text22"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan22"
       x="457.70602"
       y="429.10202"
       style="font-size:10.6667px;fill:#000000">F</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="456.39209"
     y="414.22476"
     id="text23"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan23"
       x="456.39209"
       y="414.22476"
       style="font-size:10.6667px;fill:#000000">G</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="563.00696"
     y="459.01456"
     id="text24"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan24"
       x="563.00696"
       y="459.01456"
       style="font-size:10.6667px;fill:#000000">F</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="327.35321"
     y="429.37643"
     id="text25"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan25"
       x="327.35321"
       y="429.37643"
       style="font-size:10.6667px;fill:#000000">F</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="456.39209"
     y="356.22476"
     id="text26"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan26"
       x="456.39209"
       y="356.22476"
       style="font-size:10.6667px;fill:#000000">N</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="590.31244"
     y="396.01666"
     id="text27"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan27"
       x="590.31244"
       y="396.01666"
       style="font-size:10.6667px;fill:#000000">N</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="566.98615"
     y="446.88156"
     id="text28"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan28"
       x="566.98615"
       y="446.88156"
       style="font-size:10.6667px;fill:#000000">G</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="326.58813"
     y="416.42017"
     id="text29"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan29"
       x="326.58813"
       y="416.42017"
       style="font-size:10.6667px;fill:#000000">G</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="326.58813"
     y="358.42017"
     id="text30"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan30"
       x="326.58813"
       y="358.42017"
       style="font-size:10.6667px;fill:#000000">N</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="456.04904"
     y="344.38898"
     id="text31"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan31"
       x="456.04904"
       y="344.38898"
       style="font-size:10.6667px;fill:#000000">O</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="459.54193"
     y="250.27513"
     id="text32"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan32"
       x="459.54193"
       y="250.27513"
       style="font-size:10.6667px;fill:#000000">Y</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="589.42053"
     y="367.71527"
     id="text33"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan33"
       x="589.42053"
       y="367.71527"
       style="font-size:10.6667px;fill:#000000">Q</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="591.89038"
     y="274.4101"
     id="text34"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan34"
       x="591.89038"
       y="274.4101"
       style="font-size:10.6667px;fill:#000000">ZZ</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="326.87296"
     y="326.3558"
     id="text35"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan35"
       x="326.87296"
       y="326.3558"
       style="font-size:10.6667px;fill:#000000">Q</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="326.43207"
     y="229.94586"
     id="text36"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan36"
       x="326.43207"
       y="229.94586"
       style="font-size:10.6667px;fill:#000000">ZZ</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="227.9128"
     y="242.51669"
     id="text37"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan37"
       x="227.9128"
       y="242.51669"
       style="font-size:10.6667px;fill:#000000">AA</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="230.65707"
     y="232.3629"
     id="text38"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan38"
       x="230.65707"
       y="232.3629"
       style="font-size:10.6667px;fill:#000000">BB</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="234.49905"
     y="220.83698"
     id="text39"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan39"
       x="234.49905"
       y="220.83698"
       style="font-size:10.6667px;fill:#000000">CC</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="594.7522"
     y="259.60345"
     id="text40"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan40"
       x="594.7522"
       y="259.60345"
       style="font-size:10.6667px;fill:#000000">AA</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="594.97382"
     y="251.09909"
     id="text41"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan41"
       x="594.97382"
       y="251.09909"
       style="font-size:10.6667px;fill:#000000">BB</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="594.83783"
     y="240.05829"
     id="text42"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan42"
       x="594.83783"
       y="240.05829"
       style="font-size:10.6667px;fill:#000000">CC</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="583.03748"
     y="168.15842"
     id="text43"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan43"
       x="583.03748"
       y="168.15842"
       style="font-size:10.6667px;fill:#000000">D</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="459.27094"
     y="173.64696"
     id="text44"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan44"
       x="459.27094"
       y="173.64696"
       style="font-size:10.6667px;fill:#000000">A</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="450.51398"
     y="131.23824"
     id="text45"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan45"
       x="450.51398"
       y="131.23824"
       style="font-size:10.6667px;fill:#000000">E</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="323.15518"
     y="142.91113"
     id="text46"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan46"
       x="323.15518"
       y="142.91113"
       style="font-size:10.6667px;fill:#000000">D</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="458.47"
     y="121.05065"
     id="text47"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan47"
       x="458.47"
       y="121.05065"
       style="font-size:10.6667px;fill:#000000">F</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="458.47"
     y="105.13389"
     id="text48"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan48"
       x="458.47"
       y="105.13389"
       style="font-size:10.6667px;fill:#000000">H</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="588.27393"
     y="154.94238"
     id="text49"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan49"
       x="588.27393"
       y="154.94238"
       style="font-size:10.6667px;fill:#000000">F</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="575.92468"
     y="131.20445"
     id="text50"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan50"
       x="575.92468"
       y="131.20445"
       style="font-size:10.6667px;fill:#000000">H</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="321.94254"
     y="106.36881"
     id="text51"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan51"
       x="321.94254"
       y="106.36881"
       style="font-size:10.6667px;fill:#000000">H</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="321.66815"
     y="121.4623"
     id="text52"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan52"
       x="321.66815"
       y="121.4623"
       style="font-size:10.6667px;fill:#000000">F</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="322.35416"
     y="95.803375"
     id="text53"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan53"
       x="322.35416"
       y="95.803375"
       style="font-size:10.6667px;fill:#000000">J</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="321.8053"
     y="52.992771"
     id="text54"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan54"
       x="321.8053"
       y="52.992771"
       style="font-size:10.6667px;fill:#000000">N</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="582.37372"
     y="121.73672"
     id="text55"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan55"
       x="582.37372"
       y="121.73672"
       style="font-size:10.6667px;fill:#000000">J</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="559.59625"
     y="71.516586"
     id="text56"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan56"
       x="559.59625"
       y="71.516586"
       style="font-size:10.6667px;fill:#000000">N</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="459.15601"
     y="95.254517"
     id="text57"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan57"
       x="459.15601"
       y="95.254517"
       style="font-size:10.6667px;fill:#000000">J</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="441.59268"
     y="57.520809"
     id="text58"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan58"
       x="441.59268"
       y="57.520809"
       style="font-size:10.6667px;fill:#000000">J</tspan></text>
  <text
     fill="#ffffff"
     font-size="14px"
     font-family="Helvetica"
     x="459.27094"
     y="161.64696"
     id="text8"
     class="mapnode"
     style="font-size:10.6667px;fill:#000000"><tspan
       id="tspan8"
       x="459.27094"
       y="161.64696"
       style="font-size:10.6667px;fill:#000000">B</tspan></text>
</svg>
`;
const svg = svgSrc.replace('\\', '');
root.render(
  <TicketMap
    venueId="568"
    configurationId="14416"
    ticketGroups={ticketGroups}
    customMapSvg={svg}
    manifest={manifest}
    onSelection={(zone) => console.log(zone)}
  />,
);