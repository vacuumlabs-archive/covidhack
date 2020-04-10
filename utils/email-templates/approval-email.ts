export const approvalEmail = (requestId) => `<!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Simple Transactional Email</title>
      <style>
        /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
        
        /*All the styling goes here*/
        
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%; 
        }
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%; 
        }
        table {
          border-collapse: separate;
          /*mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;*/
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top; 
        }
        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
        .body {
          background-color: #f6f6f6;
          width: 100%; 
        }
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px; 
        }
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 580px;
          padding: 10px; 
        }
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%; 
        }
        .wrapper {
          box-sizing: border-box;
          padding: 20px; 
        }
        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }
        .footer {
          clear: both;
          margin-top: 10px;
          text-align: center;
          width: 100%; 
        }
          .footer td,
          .footer p,
          .footer span,
          .footer a {
            color: #999999;
            font-size: 12px;
            text-align: center; 
        }
        /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          margin-bottom: 30px; 
        }
        h1 {
          font-size: 35px;
          font-weight: 300;
          text-align: center;
          text-transform: capitalize; 
        }
        p,
        ul,
        ol {
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          margin-bottom: 15px; 
        }
          p li,
          ul li,
          ol li {
            list-style-position: inside;
            margin-left: 5px; 
        }
        a {
          color: #3498db;
          text-decoration: underline; 
        }
  
        tr.nice-table{
          width: 100%;
        }
  
        td.nice-cell {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        /* -------------------------------------
            BUTTONS
        ------------------------------------- */
        .btn {
          box-sizing: border-box;
          width: 100%; }
          .btn > tbody > tr > td {
            padding-bottom: 15px; }
          .btn table {
            width: auto; 
        }
          .btn table td {
            background-color: #ffffff;
            border-radius: 5px;
            text-align: center; 
        }
          .btn a {
            background-color: #ffffff;
            border: solid 1px #3498db;
            border-radius: 5px;
            box-sizing: border-box;
            color: #3498db;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            padding: 12px 25px;
            text-decoration: none;
            text-transform: capitalize; 
        }
        .btn-primary table td {
          background-color: #3498db; 
        }
        .btn-primary a {
          background-color: #3498db;
          border-color: #3498db;
          color: #ffffff; 
        }
  
        .btn-sm a {
          font-size: 10px !important;
          text-transform: none !important; 
          padding: 6px 15px !important;
        }
        /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
        .last {
          margin-bottom: 0; 
        }
        .first {
          margin-top: 0; 
        }
        .align-center {
          text-align: center; 
        }
        .align-right {
          text-align: right; 
        }
        .align-left {
          text-align: left; 
        }
        .clear {
          clear: both; 
        }
        .mt0 {
          margin-top: 0; 
        }
        .mb0 {
          margin-bottom: 0; 
        }
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          /*mso-hide: all;*/
          visibility: hidden;
          width: 0; 
        }
        .powered-by a {
          text-decoration: none; 
        }
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          margin: 20px 0; 
        }
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important; 
          }
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important; 
          }
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important; 
          }
          table[class=body] .content {
            padding: 0 !important; 
          }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important; 
          }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important; 
          }
          table[class=body] .btn table {
            width: 100% !important; 
          }
          table[class=body] .btn a {
            width: 100% !important; 
          }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important; 
          }
        }
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%; 
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%; 
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important; 
          }
          .btn-primary table td:hover {
            background-color: #34495e !important; 
          }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important; 
          } 
        }
      </style>
    </head>
    <body class="">
      <span class="preheader">Objednávka schválená.</span>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
              <center>
                <!--
                <img src="data:image/png;base64,{{base64_encode(file_get_contents(public_path('logo.png')))}}" />
                -->
                <!--<img src="{{asset('public/logo.png')}}" />
  
                <br><br>
              </center>
              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">
                
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p>Dobrý deň, <br><br>
  
                          GRATULUJEME! Vaše označenie môže tvoriť ochrannú známku a zhodné označenie doposiaľ v registri ochranných známok zapísané nie je.<br><br>
                           
                          Ak máte záujem o registráciu predloženého označenia ako ochrannej známky, kliknite na tlačítko “OBJEDNAŤ”, čím záväzne objednáte službu registrácie ochrannej známky za podmienok zverejnených na stránke brandema a vo vyplnenom formulári brandema. <br><br>
  
                          Po objednaní služby Vám bude na Váš email doručené plnomocenstvo na zastupovanie pred príslušným úradom priemyselného (duševného) vlastníctva a faktúra s odmenou za služby advokátskej kancelárie. Zároveň získate možnosť kontaktovať priamo právnika, ktorý bude celú záležitosť vybavovať.<br><br>
                           
                          Po doručení podpísaného plnomocenstva a úhrade faktúry advokátska kancelária bezodkladne pripraví žiadosť o zápis ochrannej známky do registra a odošle ju príslušnému úradu.<br><br>
  
                          
                          V cene registrácie ochrannej známky je:
                          <ul>
                          <li>Rešerš už zapísaných ochranných známok</li>
                          <li>Posúdenie spôsobilosti ochrannej známky na zápis</li>
                          <li>Odporúčanie, aký druh ochrannej známky je najvhodnejší</li>
                          <li>Konzultácie pri úkonoch súvisiacich s registráciou ochrannej známky</li>
                          <li>Príprava a podanie prihlášky na príslušný úrad</li>
                          <li>Zastupovanie pred úradom až do vydania osvedčenia o zápise ochrannej známky</li>
                          <li>Odovzdanie všetkých dokumentov</li>
                          </ul>
                          <br>
                          V cene nie je zahrnuté:
                          <ul>
                          <li>zastupovanie v spore s iným subjektom počas zápisu (napr. ak iný subjekt podá proti zápisu Vašej ochrannej známky pripomienky alebo námietky)</li>
                          </ul>
                          <br>
                          
  
                          Ďalšie praktické informácie nájdete na našej stránke v časti FAQ.<br><br>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="center">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td> <a href="https://trama.sk/registration/${requestId}" target="_blank" style="color:#FFF !important;background-color:#3498db !important;padding:15px !important;text-decoration:none;">OBJEDNAŤ</a> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <br><br>
                          Neviete sa rozhodnúť alebo potrebujete poradiť ako ďalej? Objednajte si 15 minútovú konzultáciu po telefóne alebo e-mailom. Advokátska kancelária Vám odporučí najvhodnejší postup a základné podmienky a predpoklady pre úspešné dosiahnutie Vašich cieľov.<br><br>
                          
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary btn-sm">
                            <tbody>
                              <tr>
                                <td align="center">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <!-- <td> <a href="{{url('/')}}/consult" target="_blank" style="color:#FFF !important;background-color:#3498db !important;padding:15px !important;text-decoration:none;">Potrebujem poradiť</a> </td> -->
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <br><br>
  
                          S pozdravom / Best regards<br><br>
                           
                          JUDr. Igor Demčák - advokát, konateľ / attorney, executive manager<br><br>
  
                              
  
                            <!-- <img src="{{asset('public/petranova.png')}}" /><br> -->
                            <small style="color:#274a7f;font-size: 10px;line-height: 1;">
                            Eva Petránová Advokátska kancelária s.r.o. <br>
                            Puškinova 16, 080 01 Prešov, Slovak Republic<br>
                            IČO: 36 854 581<br>
                            Tel:  + 421 (0)51 7721365<br>
                            https://www.petranova.sk<br>
                            ************************************************************************<br>
                            Eva Petránová, Advokátska kancelária s.r.o. is registered with the Commercial Register of the District Court Prešov, section Sro, file no. 19414/P, Id. No.: 36 854 581 and registered with the Slovak Bar Association.<br>
                            This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.
                            </small>
                        </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
              <!-- END MAIN CONTENT AREA -->
              </table>
  
              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">VERDIKTO</span>
                      <br> Tento email ste obdržali na základe využívania služieb spoločnosti verdikto.
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                       <a href="https://verdikto.sk">verdikto.sk</a>.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
  
            <!-- END CENTERED WHITE CONTAINER -->
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>`
