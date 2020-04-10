import {Field} from 'formik'
import React from 'react'
import PhoneInput from 'react-phone-input-2'

const PhoneNumber = (props) => {
  return (
    <>
      <Field name={props.name}>
        {({form, field}) => (
          <PhoneInput
            {...props}
            inputProps={{name: props.name}}
            placeholder="Enter phone number"
            country={'sk'}
            value={field.value}
            onChange={(value) => form.setFieldValue(props.name, value)}
            preferredCountries={['sk', 'cz']}
            localization={{sk: 'Slovenská republika', cz: 'Česká republika'}}
          />
        )}
      </Field>
      <style jsx global>{`
        .react-tel-input {
          position: relative;
          width: 100%;
        }
        .react-tel-input .form-control {
          border: 0;
          outline: none;
          background: #fdfcfc;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.06);
          border-radius: 4px;
          width: 400px;
          max-width: 400px;
          height: 48px;
          font-size: 16px;
          line-height: 28px;
          margin-left: 72px;
          padding-left: 16px;
        }
        .react-tel-input .flag-dropdown {
          outline: none;
          position: absolute;
          top: 0;
          bottom: 0;
          padding: 0;
          background: #fff;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06);
          width: 72px;
          border: 0;
          cursor: pointer;
        }
        .react-tel-input .selected-flag {
          position: relative;
          width: 72px;
          height: 100%;
          padding: 0 12px;
          border-radius: 0;
        }
        .react-tel-input .flag-dropdown:hover .selected-flag,
        .react-tel-input .flag-dropdown:focus .selected-flag {
          background-color: transparent;
        }
        .react-tel-input .selected-flag .flag {
          position: absolute;
          top: 50%;
          margin-top: -11px;
        }
        .react-tel-input .flag {
          width: 25px;
          height: 20px;
          background: url('/images/flags.png');
          background-repeat: no-repeat;
        }
        .react-tel-input .ad {
          background-position: -48px -24px;
        }
        .react-tel-input .ae {
          background-position: -72px -24px;
        }
        .react-tel-input .af {
          background-position: -96px -24px;
        }
        .react-tel-input .ag {
          background-position: -120px -24px;
        }
        .react-tel-input .ai {
          background-position: -144px -24px;
        }
        .react-tel-input .al {
          background-position: -168px -24px;
        }
        .react-tel-input .am {
          background-position: -192px -24px;
        }
        .react-tel-input .an {
          background-position: -216px -24px;
        }
        .react-tel-input .ao {
          background-position: -240px -24px;
        }
        .react-tel-input .aq {
          background-position: -264px -24px;
        }
        .react-tel-input .ar {
          background-position: -288px -24px;
        }
        .react-tel-input .as {
          background-position: -312px -24px;
        }
        .react-tel-input .at {
          background-position: -336px -24px;
        }
        .react-tel-input .au {
          background-position: -360px -24px;
        }
        .react-tel-input .aw {
          background-position: -384px -24px;
        }
        .react-tel-input .ax {
          background-position: -0px -48px;
        }
        .react-tel-input .az {
          background-position: -24px -48px;
        }
        .react-tel-input .ba {
          background-position: -48px -48px;
        }
        .react-tel-input .bb {
          background-position: -72px -48px;
        }
        .react-tel-input .bd {
          background-position: -96px -48px;
        }
        .react-tel-input .be {
          background-position: -120px -48px;
        }
        .react-tel-input .bf {
          background-position: -144px -48px;
        }
        .react-tel-input .bg {
          background-position: -168px -48px;
        }
        .react-tel-input .bh {
          background-position: -192px -48px;
        }
        .react-tel-input .bi {
          background-position: -216px -48px;
        }
        .react-tel-input .bj {
          background-position: -240px -48px;
        }
        .react-tel-input .bl {
          background-position: -264px -48px;
        }
        .react-tel-input .bm {
          background-position: -288px -48px;
        }
        .react-tel-input .bn {
          background-position: -312px -48px;
        }
        .react-tel-input .bo {
          background-position: -336px -48px;
        }
        .react-tel-input .br {
          background-position: -360px -48px;
        }
        .react-tel-input .bs {
          background-position: -384px -48px;
        }
        .react-tel-input .bt {
          background-position: -0px -72px;
        }
        .react-tel-input .bw {
          background-position: -24px -72px;
        }
        .react-tel-input .by {
          background-position: -48px -72px;
        }
        .react-tel-input .bz {
          background-position: -72px -72px;
        }
        .react-tel-input .ca {
          background-position: -96px -72px;
        }
        .react-tel-input .cc {
          background-position: -120px -72px;
        }
        .react-tel-input .cd {
          background-position: -144px -72px;
        }
        .react-tel-input .cf {
          background-position: -168px -72px;
        }
        .react-tel-input .cg {
          background-position: -192px -72px;
        }
        .react-tel-input .ch {
          background-position: -216px -72px;
        }
        .react-tel-input .ci {
          background-position: -240px -72px;
        }
        .react-tel-input .ck {
          background-position: -264px -72px;
        }
        .react-tel-input .cl {
          background-position: -288px -72px;
        }
        .react-tel-input .cm {
          background-position: -312px -72px;
        }
        .react-tel-input .cn {
          background-position: -336px -72px;
        }
        .react-tel-input .co {
          background-position: -360px -72px;
        }
        .react-tel-input .cr {
          background-position: -384px -72px;
        }
        .react-tel-input .cu {
          background-position: -0px -96px;
        }
        .react-tel-input .cv {
          background-position: -24px -96px;
        }
        .react-tel-input .cw {
          background-position: -48px -96px;
        }
        .react-tel-input .cx {
          background-position: -72px -96px;
        }
        .react-tel-input .cy {
          background-position: -96px -96px;
        }
        .react-tel-input .cz {
          background-position: -120px -96px;
        }
        .react-tel-input .de {
          background-position: -144px -96px;
        }
        .react-tel-input .dj {
          background-position: -168px -96px;
        }
        .react-tel-input .dk {
          background-position: -192px -96px;
        }
        .react-tel-input .dm {
          background-position: -216px -96px;
        }
        .react-tel-input .do {
          background-position: -240px -96px;
        }
        .react-tel-input .dz {
          background-position: -264px -96px;
        }
        .react-tel-input .ec {
          background-position: -288px -96px;
        }
        .react-tel-input .ee {
          background-position: -312px -96px;
        }
        .react-tel-input .eg {
          background-position: -336px -96px;
        }
        .react-tel-input .eh {
          background-position: -360px -96px;
        }
        .react-tel-input .er {
          background-position: -384px -96px;
        }
        .react-tel-input .es {
          background-position: -0px -120px;
        }
        .react-tel-input .et {
          background-position: -24px -120px;
        }
        .react-tel-input .eu {
          background-position: -48px -120px;
        }
        .react-tel-input .fi {
          background-position: -72px -120px;
        }
        .react-tel-input .fj {
          background-position: -96px -120px;
        }
        .react-tel-input .fk {
          background-position: -120px -120px;
        }
        .react-tel-input .fm {
          background-position: -144px -120px;
        }
        .react-tel-input .fo {
          background-position: -168px -120px;
        }
        .react-tel-input .fr {
          background-position: -192px -120px;
        }
        .react-tel-input .ga {
          background-position: -216px -120px;
        }
        .react-tel-input .gb {
          background-position: -240px -120px;
        }
        .react-tel-input .gd {
          background-position: -264px -120px;
        }
        .react-tel-input .ge {
          background-position: -288px -120px;
        }
        .react-tel-input .gg {
          background-position: -312px -120px;
        }
        .react-tel-input .gh {
          background-position: -336px -120px;
        }
        .react-tel-input .gi {
          background-position: -360px -120px;
        }
        .react-tel-input .gl {
          background-position: -384px -120px;
        }
        .react-tel-input .gm {
          background-position: -0px -144px;
        }
        .react-tel-input .gn {
          background-position: -24px -144px;
        }
        .react-tel-input .gq {
          background-position: -48px -144px;
        }
        .react-tel-input .gr {
          background-position: -72px -144px;
        }
        .react-tel-input .gs {
          background-position: -96px -144px;
        }
        .react-tel-input .gt {
          background-position: -120px -144px;
        }
        .react-tel-input .gu {
          background-position: -144px -144px;
        }
        .react-tel-input .gw {
          background-position: -168px -144px;
        }
        .react-tel-input .gy {
          background-position: -192px -144px;
        }
        .react-tel-input .hk {
          background-position: -216px -144px;
        }
        .react-tel-input .hn {
          background-position: -240px -144px;
        }
        .react-tel-input .hr {
          background-position: -264px -144px;
        }
        .react-tel-input .ht {
          background-position: -288px -144px;
        }
        .react-tel-input .hu {
          background-position: -312px -144px;
        }
        .react-tel-input .ic {
          background-position: -336px -144px;
        }
        .react-tel-input .id {
          background-position: -360px -144px;
        }
        .react-tel-input .ie {
          background-position: -384px -144px;
        }
        .react-tel-input .il {
          background-position: -0px -168px;
        }
        .react-tel-input .im {
          background-position: -24px -168px;
        }
        .react-tel-input .in {
          background-position: -48px -168px;
        }
        .react-tel-input .iq {
          background-position: -72px -168px;
        }
        .react-tel-input .ir {
          background-position: -96px -168px;
        }
        .react-tel-input .is {
          background-position: -120px -168px;
        }
        .react-tel-input .it {
          background-position: -144px -168px;
        }
        .react-tel-input .je {
          background-position: -168px -168px;
        }
        .react-tel-input .jm {
          background-position: -192px -168px;
        }
        .react-tel-input .jo {
          background-position: -216px -168px;
        }
        .react-tel-input .jp {
          background-position: -240px -168px;
        }
        .react-tel-input .ke {
          background-position: -264px -168px;
        }
        .react-tel-input .kg {
          background-position: -288px -168px;
        }
        .react-tel-input .kh {
          background-position: -312px -168px;
        }
        .react-tel-input .ki {
          background-position: -336px -168px;
        }
        .react-tel-input .km {
          background-position: -360px -168px;
        }
        .react-tel-input .kn {
          background-position: -384px -168px;
        }
        .react-tel-input .kp {
          background-position: -0px -192px;
        }
        .react-tel-input .kr {
          background-position: -24px -192px;
        }
        .react-tel-input .kw {
          background-position: -48px -192px;
        }
        .react-tel-input .ky {
          background-position: -72px -192px;
        }
        .react-tel-input .kz {
          background-position: -96px -192px;
        }
        .react-tel-input .la {
          background-position: -120px -192px;
        }
        .react-tel-input .lb {
          background-position: -144px -192px;
        }
        .react-tel-input .lc {
          background-position: -168px -192px;
        }
        .react-tel-input .li {
          background-position: -192px -192px;
        }
        .react-tel-input .lk {
          background-position: -216px -192px;
        }
        .react-tel-input .lr {
          background-position: -240px -192px;
        }
        .react-tel-input .ls {
          background-position: -264px -192px;
        }
        .react-tel-input .lt {
          background-position: -288px -192px;
        }
        .react-tel-input .lu {
          background-position: -312px -192px;
        }
        .react-tel-input .lv {
          background-position: -336px -192px;
        }
        .react-tel-input .ly {
          background-position: -360px -192px;
        }
        .react-tel-input .ma {
          background-position: -384px -192px;
        }
        .react-tel-input .mc {
          background-position: -0px -216px;
        }
        .react-tel-input .md {
          background-position: -24px -216px;
        }
        .react-tel-input .me {
          background-position: -48px -216px;
        }
        .react-tel-input .mf {
          background-position: -72px -216px;
        }
        .react-tel-input .mg {
          background-position: -96px -216px;
        }
        .react-tel-input .mh {
          background-position: -120px -216px;
        }
        .react-tel-input .mk {
          background-position: -144px -216px;
        }
        .react-tel-input .ml {
          background-position: -168px -216px;
        }
        .react-tel-input .mm {
          background-position: -192px -216px;
        }
        .react-tel-input .mn {
          background-position: -216px -216px;
        }
        .react-tel-input .mo {
          background-position: -240px -216px;
        }
        .react-tel-input .mp {
          background-position: -264px -216px;
        }
        .react-tel-input .mq {
          background-position: -288px -216px;
        }
        .react-tel-input .mr {
          background-position: -312px -216px;
        }
        .react-tel-input .ms {
          background-position: -336px -216px;
        }
        .react-tel-input .mt {
          background-position: -360px -216px;
        }
        .react-tel-input .mu {
          background-position: -384px -216px;
        }
        .react-tel-input .mv {
          background-position: -0px -240px;
        }
        .react-tel-input .mw {
          background-position: -24px -240px;
        }
        .react-tel-input .mx {
          background-position: -48px -240px;
        }
        .react-tel-input .my {
          background-position: -72px -240px;
        }
        .react-tel-input .mz {
          background-position: -96px -240px;
        }
        .react-tel-input .na {
          background-position: -120px -240px;
        }
        .react-tel-input .nc {
          background-position: -144px -240px;
        }
        .react-tel-input .ne {
          background-position: -168px -240px;
        }
        .react-tel-input .nf {
          background-position: -192px -240px;
        }
        .react-tel-input .ng {
          background-position: -216px -240px;
        }
        .react-tel-input .ni {
          background-position: -240px -240px;
        }
        .react-tel-input .nl {
          background-position: -264px -240px;
        }
        .react-tel-input .no {
          background-position: -288px -240px;
        }
        .react-tel-input .np {
          background-position: -312px -240px;
        }
        .react-tel-input .nr {
          background-position: -336px -240px;
        }
        .react-tel-input .nu {
          background-position: -360px -240px;
        }
        .react-tel-input .nz {
          background-position: -384px -240px;
        }
        .react-tel-input .om {
          background-position: -0px -264px;
        }
        .react-tel-input .pa {
          background-position: -24px -264px;
        }
        .react-tel-input .pe {
          background-position: -48px -264px;
        }
        .react-tel-input .pf {
          background-position: -72px -264px;
        }
        .react-tel-input .pg {
          background-position: -96px -264px;
        }
        .react-tel-input .ph {
          background-position: -120px -264px;
        }
        .react-tel-input .pk {
          background-position: -192px -264px;
        }
        .react-tel-input .pl {
          background-position: -216px -264px;
        }
        .react-tel-input .pn {
          background-position: -240px -264px;
        }
        .react-tel-input .pr {
          background-position: -264px -264px;
        }
        .react-tel-input .ps {
          background-position: -288px -264px;
        }
        .react-tel-input .pt {
          background-position: -312px -264px;
        }
        .react-tel-input .pw {
          background-position: -336px -264px;
        }
        .react-tel-input .py {
          background-position: -360px -264px;
        }
        .react-tel-input .qa {
          background-position: -384px -264px;
        }
        .react-tel-input .ro {
          background-position: -0px -288px;
        }
        .react-tel-input .rs {
          background-position: -24px -288px;
        }
        .react-tel-input .ru {
          background-position: -48px -288px;
        }
        .react-tel-input .rw {
          background-position: -72px -288px;
        }
        .react-tel-input .sa {
          background-position: -96px -288px;
        }
        .react-tel-input .sb {
          background-position: -120px -288px;
        }
        .react-tel-input .sc {
          background-position: -144px -288px;
        }
        .react-tel-input .sd {
          background-position: -168px -288px;
        }
        .react-tel-input .se {
          background-position: -192px -288px;
        }
        .react-tel-input .sg {
          background-position: -216px -288px;
        }
        .react-tel-input .sh {
          background-position: -240px -288px;
        }
        .react-tel-input .si {
          background-position: -264px -288px;
        }
        .react-tel-input .sk {
          background-position: -288px -288px;
        }
        .react-tel-input .sl {
          background-position: -312px -288px;
        }
        .react-tel-input .sm {
          background-position: -336px -288px;
        }
        .react-tel-input .sn {
          background-position: -360px -288px;
        }
        .react-tel-input .so {
          background-position: -384px -288px;
        }
        .react-tel-input .sr {
          background-position: -0px -312px;
        }
        .react-tel-input .ss {
          background-position: -24px -312px;
        }
        .react-tel-input .st {
          background-position: -48px -312px;
        }
        .react-tel-input .sv {
          background-position: -72px -312px;
        }
        .react-tel-input .sy {
          background-position: -96px -312px;
        }
        .react-tel-input .sz {
          background-position: -120px -312px;
        }
        .react-tel-input .tc {
          background-position: -144px -312px;
        }
        .react-tel-input .td {
          background-position: -168px -312px;
        }
        .react-tel-input .tf {
          background-position: -192px -312px;
        }
        .react-tel-input .tg {
          background-position: -216px -312px;
        }
        .react-tel-input .th {
          background-position: -240px -312px;
        }
        .react-tel-input .tj {
          background-position: -264px -312px;
        }
        .react-tel-input .tk {
          background-position: -288px -312px;
        }
        .react-tel-input .tl {
          background-position: -312px -312px;
        }
        .react-tel-input .tm {
          background-position: -336px -312px;
        }
        .react-tel-input .tn {
          background-position: -360px -312px;
        }
        .react-tel-input .to {
          background-position: -384px -312px;
        }
        .react-tel-input .tr {
          background-position: -0px -336px;
        }
        .react-tel-input .tt {
          background-position: -24px -336px;
        }
        .react-tel-input .tv {
          background-position: -48px -336px;
        }
        .react-tel-input .tw {
          background-position: -72px -336px;
        }
        .react-tel-input .tz {
          background-position: -96px -336px;
        }
        .react-tel-input .ua {
          background-position: -120px -336px;
        }
        .react-tel-input .ug {
          background-position: -144px -336px;
        }
        .react-tel-input .us {
          background-position: -168px -336px;
        }
        .react-tel-input .uy {
          background-position: -192px -336px;
        }
        .react-tel-input .uz {
          background-position: -216px -336px;
        }
        .react-tel-input .va {
          background-position: -240px -336px;
        }
        .react-tel-input .vc {
          background-position: -264px -336px;
        }
        .react-tel-input .ve {
          background-position: -288px -336px;
        }
        .react-tel-input .vg {
          background-position: -312px -336px;
        }
        .react-tel-input .vi {
          background-position: -336px -336px;
        }
        .react-tel-input .vn {
          background-position: -360px -336px;
        }
        .react-tel-input .vu {
          background-position: -384px -336px;
        }
        .react-tel-input .hide {
          display: none;
        }
        .react-tel-input .v-hide {
          visibility: hidden;
        }
        .react-tel-input .selected-flag .arrow {
          position: relative;
          top: 6px;
          left: 36px;
          width: 8px;
          height: 8px;
          margin-top: 0;
          border: solid #d2cbc6;
          border-width: 0 2px 2px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .react-tel-input .selected-flag .arrow.up {
          top: 10px;
          border-top: none;
          border-bottom: 2px solid #d2cbc6;
          -webkit-transform: rotate(-135deg);
          -ms-transform: rotate(-135deg);
          transform: rotate(-135deg);
        }
        .react-tel-input .form-control.open {
          z-index: 2;
        }
        .react-tel-input .flag-dropdown.open {
          z-index: 2;
          background: #fff;
          border-radius: 3px 0 0 0;
        }
        .react-tel-input .flag-dropdown.open .selected-flag {
          background: #fff;
          border-radius: 3px 0 0 0;
        }
        .react-tel-input .country-list {
          z-index: 1;
          list-style: none;
          position: absolute;
          padding: 0;
          margin: 0;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
          background-color: #fff;
          width: 298px;
          max-height: 217px;
          overflow: hidden;
          overflow-y: auto;
          border-radius: 0;
          padding-top: 4px;
        }
        .react-tel-input .country-list::-webkit-scrollbar-track {
          width: 2px;
          margin-top: 8px;
          background-color: transparent;
        }
        .react-tel-input .country-list::-webkit-scrollbar {
          width: 2px;
          margin-top: 8px;
          background-color: transparent;
        }
        .react-tel-input .country-list::-webkit-scrollbar-thumb {
          width: 2px;
          height: 32px;
          border-radius: 60px;
          background-color: #d2cbc6;
        }
        .react-tel-input .country-list .country {
          padding: 8px 12px 8px 60px;
          position: relative;
        }
        .react-tel-input .country-list .country:focus {
          outline: none;
        }
        .react-tel-input .country-list .flag {
          display: inline-block;
          position: absolute;
          left: 12px;
          top: 6px;
        }
        .react-tel-input .country-list .country-name {
          font-size: 16px;
          line-height: 28px;
          margin-right: 8px;
        }
        .react-tel-input .country-list .country .dial-code {
          font-size: 16px;
          line-height: 28px;
          color: #938e8a;
        }
        .react-tel-input .country-list .country .dial-code:before {
          content: '(';
          position: relative;
        }
        .react-tel-input .country-list .country .dial-code:after {
          content: ')';
          position: relative;
        }
        .react-tel-input .country-list .country:hover,
        .react-tel-input .country-list .country:focus,
        .react-tel-input .country-list .country.highlight:hover,
        .react-tel-input .country-list .country.highlight:focus {
          background-color: #f5f5f5;
        }
        .react-tel-input .country-list .country.highlight {
          background-color: transparent;
        }
        .react-tel-input .country-list .divider {
          padding-bottom: 4px;
          margin: 0 12px 4px;
          border-bottom: 1px solid #fbf4ef;
        }
      `}</style>
    </>
  )
}

export default PhoneNumber
