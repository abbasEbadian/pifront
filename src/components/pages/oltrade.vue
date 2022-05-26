<template>
  <div style="direction:ltr;width:100%;margin:0 auto; padding:0" v-cloak id="trader"><br>

    <div style="margin-top:-18px ; width:100%">
      <b-card no-body class="mb-3 cardss" style=";height:380px ; width:20%">
          <h5 style="color:rgb(255, 111, 44);font-weight: bold;font-family:'arial';text-align:left ; padding-top: 8px ; padding-right:10px; margin-bottom:0">Order Book</h5><br>
          <table v-if="boardinfo.asks"  style="text-align:right; color:#777 ;font:10px 'arial';margin:0 ;" class="txt">
              <tr style="width:100%;;box-sizing:border-box; padding:0">
                  <th scope="col" style="width:30% ; text-align:left ;font:14px 'arial' ; padding: 0 10px ">Price</th>
                  <th scope="col" style="width:30% ; text-align:center ;font:14px 'arial' ; padding: 0  ">Quantity</th>
                  <th scope="col" style="width:30% ; text-align:right ;font:14px 'arial' ; padding: 0 10px   ">SUM</th>
              </tr>
          <tr v-for="(item, idx) in boardinfo.bids.slice(0,5)" v-bind:key="idx" style="text-align:right; color:#777;font:12px 'arial';">
             <td @click="fillpos(item[0])" style="width:30% ; margin-top:0 ; padding-top:3px;color:green;cursor:pointer ; text-align:left">{{item[0]}}</td>
             <td style="width:30% ; margin-top:0 ; padding-top:3px; ; text-align:center">{{parseFloat(item[1]).toFixed(6)}}</td>
            <td style="width:30% ; margin-top:0 ; padding-top:3px; ; text-align:right">{{(item[1] * item[0]).toFixed(2)}}</td>

          </tr>
          </table>
          <hr style="margin : 0 ; padding-top:0">
        <h5 style="width:100%;height:60px;padding:8px;text-align:left;color:#777;margin:0;color:green; margin-bottom:0">{{boardinfo.last}} <br></h5>
        <hr style="margin-top : 0 ; padding-top:0">
          <table v-if="boardinfo.bids"  style="text-align:right; color:#777;font:12px 'arial';" class="">
          <tr v-for="(item, idx) in boardinfo.asks.slice(0,5)" v-bind:key="idx">
            
             <td @click="fillneg(item[0])" style="width:30% ; margin-top:0 ; padding-top:3px;color:red;cursor:pointer ; text-align:left">{{item[0]}}</td>
             <td style="width:30% ; margin-top:0 ; padding-top:3px; ; text-align:center">{{parseFloat(item[1]).toFixed(6)}}</td>
            <td style="width:30% ; margin-top:0 ; padding-top:3px; ; text-align:right">{{(item[1] * item[0]).toFixed(2)}}</td>          </tr>
          </table>
        <div>
          <b-card-body class="py-3">
          </b-card-body>
        </div>
        <div>
        </div>
      </b-card>
      <div class="" style="float:left;height:370px  ; width:50%">
          <b-card no-body class="cardss" style="border-radius: 0!important;height:380px"><br>
          <h5 v-if="balances.data" style="font-family:'arial'!important ; text-align:left ; margin-left:30px; color:#777">{{balances.data.sell_asset_type}}/{{balances.data.buy_asset_type}}</h5><br>
          <b-button variant="light" style="margin:5px; float: left;width: 100px;position: absolute;right: 110px;margin: 10px 20px;" @click="borrow()">Borrow</b-button>
          <b-button variant="light" style="margin:5px; float: left;width: 100px;position: absolute;right: 0px;margin: 10px 20px;" @click="repay()">Repay</b-button>
          <b-button variant="light" style="margin:5px; float: left; width: 100px;position: absolute;right: 220px;margin: 10px 20px;" @click="transfer()">Transfer</b-button>
            <div style="margin:auto" id="tradingview_1be21"></div>
        <div>
          <b-card-body class="py-3 cardss">
          </b-card-body>
        </div>

      </b-card>
      </div>
      <b-card no-body class="mb-3 cardss" style="height:600px ;overflow:auto ; width:30% ; float:right ; margin-bottom:0"><br>
      <h4 @click="openlist" style="font-family:'arial'!important;position:absolute;border-bottom:solid #ececec 2px; font-weight:bold ;height:60px; width:100% ; text-align: left ; padding:14px ; color:#777"><div  v-if="balances.data"><IconCrypto :coinname="balances.data.sell_asset_type" size="32" />  {{balances.data.sell_asset_type}}/{{balances.data.buy_asset_type}} <svg viewBox="0 0 1024 1024" focusable="false" class="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg> </div></h4><br>
      <div hidden id="listbox" style=" z-index:1">
          <b-input v-model="searchtext" placeholder="...Search" style="top:60px;position:absolute;height:60px; width: 100%;margin:auto;background:transparent;border-style:none;padding:10px;border-radius:0;border-bottom:solid #f5f5f5;text-align:right ; z-index:1" @input="search()"></b-input>
        <table style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:100% ; background:white" class="cardss">
              <tr style="width:100%;background:white;box-sizing:border-box">
                  <th scope="col" style="width:50%">Pair</th>
                  <th scope="col" style="width:50%">Price</th>
              </tr>
              <tr v-for="(item,name,idx) in info" v-bind:key="idx" class="btn-cur" :id="`${name}`" @click="click(name)">
                <td v-if="leverage[name]" style="width:50%"><a :href="`/margin-trade/${name}`" style="color:#777" @click="changeroute()" >{{name}} <a style="border-style:solid;border-width:1px;padding:3px;border-color:orange;color:orange;border-radius:5px">{{leverage[name]['leverage']}}X</a></a> </td>
                <td style="width:50%"><a :href="`/margin-trade/${name}`"  style="color:#777" @click="changeroute()" > {{item.last}}</a></td>
              </tr>
          
          </table>
        </div>

        <div id="tradebox" style="top:60px;position:absolute;height:60px; width: 100%;margin:auto;background:transparent;border-style:none;padding:10px;border-radius:0;border-bottom:solid #ececec 2px;text-align:right; direction:ltr ; border-style: none">
          <b-form-group style="width:100%"      v-slot="{ ariaDescribedby }">
            <b-form-radio-group id="btn-radios-2" v-model="selected" :aria-describedby="ariaDescribedby" button-variant="outline-primary" size="lg" name="radio-btn-outline" buttons style="width:100%">
              <b-form-radio style="padding-top: 4px ; padding-bottom:4px" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A" selected>Manual Trade</b-form-radio>
              <b-form-radio style="padding-top: 4px ; padding-bottom:4px ;" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Trading Bot</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          </div>
          <div v-if="selected === 'A'" style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:90% ; margin: 3%">
            <a @click="tabselect('buytab')" id="buytab" style="font: 15px 'arial'; font-weight:bold ; color:#ff651e!important ; margin: 5px"> Buy </a> <a @click="tabselect('selltab')" id="selltab" style="font: 15px 'arial'; font-weight:bold ; color:grey ; margin: 5px"> Sell </a><br><br>
            <div class="buytab taba">
              <button @click="buyselect('buymarket')" id="buymarket" style="width:30% ;border-radius:0; margin-right:5% ; padding-top:3px ; padding-bottom:3px" class="btn btn-outline-success buybtn">Market</button><button @click="buyselect('buylimit')" style="width:30% ;border-radius:0; margin-right:5% ; padding-top:3px ; padding-bottom:3px" class="btn btn-outline-secondary buybtn" id="buylimit">Limit</button><button @click="buyselect('buystoplimit')" style="width:30% ;border-radius:0; padding-top:3px ; padding-bottom:3px" class="btn btn-outline-secondary buybtn" id="buystoplimit">Stop Limit </button><br><br>
                <form @submit.prevent="mbuy()" class="buys buymarket">
                  <button class="btn btn-outline-secondary" type="button" style="padding-top : 0px;padding-bottom : 0px ; float:right ; width:100%;margin-bottom:5px;margin-top:5px; border-radius:0" v-if="balances.data" @click="mbbalance()">  ({{parseFloat(this.balances.data.balance.buy_type)}} USDT) : Balance</button> 
                  <div class="input-group mb-3">
                    <div class="input-group-prepend" style="direction:rtl">
                      <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'; background:rgba(255,255,255,.2)">USDT</span>
                      <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'; background:rgba(255,255,255,.2)">Price</span>
                    </div>
                    <input readonly disabled placeholder="Best Price" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number"  style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right; background:rgba(255,255,255,.2)">
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend" style="direction:rtl">
                      <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'">USDT</span>
                      <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Amount</span>  
                    </div>
                      <input v-if="leverage[$route.params.sym]" v-model="mb_amount" class="form-control"  :max="Number(leverage[$route.params.sym]['smax'])" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                  </div>
                  <table style="width:98%;margin-left:2%">
                    <tr>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">0%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">25%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">50%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">75%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">100%</td>
                    </tr>
                  </table>
                  <b-form-slider :step="0.00000001" :ticks_tooltip="true" v-if="balances.data" :min="0.00" :max="Number(balances.data.balance.buy_type)" v-model="mb_amount"></b-form-slider>
                  <p style=";font-family:'arial'">  {{mb_amount}}  USDT : SUM</p>
                  <br>
                  <input type="submit" value="Buy" class="btn btn-success" style="width:100%;border-radius:0">
                </form>
                <form hidden @submit.prevent="lbuy()" class="buys buylimit">
                  <button class="btn btn-outline-secondary" type="button" style="padding-top : 0px;padding-bottom : 0px ; float:right ; width:100%;margin-bottom:5px; border-radius:0" v-if="balances.data" @click="lbbalance()"> ({{balances.data.balance.buy_type}} {{balances.data.buy_asset_type}}) : Balance </button><br>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend" style="direction:rtl">
                          <span v-if="balances.data" class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'; ">{{balances.data.buy_asset_type}}</span>
                          <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'; ">Price</span>
                        </div>
                        <input v-model="lb_price" class="form-control" @input="lb_allset" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number"  style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend" style="direction:rtl">
                          <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'" v-if="balances.data">{{balances.data.sell_asset_type}}</span>
                          <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Amount</span>  
                        </div>
                          <input v-if="leverage[$route.params.sym]" @input="lb_allset" v-model="lb_amount"  :max="Number(leverage[$route.params.sym]['bmax'])" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                      </div>
                      <table style="width:98%;margin-left:2%">
                    <tr>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">0%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">25%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">50%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">75%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">100%</td>
                    </tr>
                  </table>
                  <b-form-slider :step="0.00000001" :ticks_tooltip="true" v-if="balances.data" :min="0.00" @slide-stop="lbslide" :max="Number(balances.data.balance.buy_type)" v-model="lb_all"></b-form-slider>
                      <p v-if="balances.data" style=";font-family:'arial'">  {{lb_all}}  {{balances.data.buy_asset_type}} : SUM</p>
                      <br>
                      <input type="submit" value="Buy" class="btn btn-success" style="width:100%;border-radius:0">
                    </form>

                <form hidden @submit.prevent="lsbuy()" class="buys buystoplimit">
                  <button class="btn btn-outline-secondary" type="button" style="padding-top : 0px;padding-bottom : 0px ; float:right ; width:100%;margin-bottom:5px; border-radius:0" v-if="balances.data" @click="lsbbalance()">  ({{balances.data.balance.buy_type}} USDT) : Balance</button> 


                <div class="input-group mb-3">
                  <div class="input-group-prepend" style="direction:rtl">
                    <span v-if="balances.data" class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'; ">{{balances.data.buy_asset_type}}</span>
                    <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'; ">Stop</span>
                  </div>
                  <input v-model="lsb_stop" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number"  style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                </div>



                <div class="input-group mb-3">
                  <div class="input-group-prepend" style="direction:rtl">
                    <span v-if="balances.data" class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'">{{balances.data.buy_asset_type}}</span>
                    <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Limit</span>  
                  </div>
                    <input v-model="lsb_limit" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                </div>




                <div class="input-group mb-3">
                  <div class="input-group-prepend" style="direction:rtl">
                    <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'" v-if="balances.data">{{balances.data.sell_asset_type}}</span>
                    <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Amount</span>  
                  </div>
                    <input v-if="leverage[$route.params.sym]" v-model="lsb_amount"  :max="Number(leverage[$route.params.sym]['bmax'])" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                </div>
                <table style="width:98%;margin-left:2%">
                    <tr>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">0%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">25%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">50%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">75%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">100%</td>
                    </tr>
                  </table>
                  <b-form-slider :step="0.00000001" :ticks_tooltip="true" v-if="balances.data" @silde-stop="lsbslide" :min="0.00" :max="Number(balances.data.balance.buy_type)" v-model="lsb_all"></b-form-slider>



                <p v-if="balances.data" style=";font-family:'arial'">  {{lsb_all}}  {{balances.data.buy_asset_type}} : SUM</p>
                <br>
                <input type="submit" value="Buy" class="btn btn-success" style="width:100%;border-radius:0">
              </form>
          </div>
          <div hidden class="selltab taba">
              <button @click="sellselect('sellmarket')" id="sellmarket" style="width:30% ; margin:1.5% ; padding-top:3px ; padding-bottom:3px" class="btn btn-outline-danger sellbtn">Limit</button><button @click="sellselect('selllimit')" style="width:30% ; margin:1.5% ; padding-top:3px ; padding-bottom:3px" class="btn btn-outline-secondary sellbtn" id="selllimit">Margin</button><button @click="sellselect('sellstoplimit')" style="width:30% ; margin:1.5% ; padding-top:3px ; padding-bottom:3px" class="btn btn-outline-secondary buybtn" id="buystoplimit">Stop Limit </button><br><br>
            <form @submit.prevent="msell()" class="sells sellmarket">
                    <button class="btn btn-outline-secondary" type="button" style="padding-top : 0px;padding-bottom : 0px ; float:right ; width:100%;margin-bottom:5px;margin-top:5px; border-radius:0" v-if="balances.data" @click="msbalance()"> ({{(balances.data.balance.sell_type)}} {{this.$route.params.sym.replace('USDT' , '')}}) : Balance</button> 
                    <div class="input-group mb-3">
                      <div class="input-group-prepend" style="direction:rtl">
                        <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'; background:rgba(255,255,255,.2)">USDT</span>
                        <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'; background:rgba(255,255,255,.2)">Price</span>
                      </div>
                      <input readonly disabled placeholder="Best Price" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number"  style="background:none; border-style:solid;border-radius:0;border-color:grey; text-align:right; background:rgba(255,255,255,.2)">
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend" style="direction:rtl">
                        <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'" v-if="balances.data">{{balances.data.sell_asset_type}}</span>
                        <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Amount</span>  
                      </div>
                        <input v-if="leverage[$route.params.sym]" v-model="ms_amount"  :max="Number(leverage[$route.params.sym]['bmax'])" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                    </div>
                    <table style="width:98%;margin-left:2%">
                      <tr>
                        <td style="text-align:center; color:#777 ; font: 12px 'arial'">0%</td>
                        <td style="text-align:center; color:#777 ; font: 12px 'arial'">25%</td>
                        <td style="text-align:center; color:#777 ; font: 12px 'arial'">50%</td>
                        <td style="text-align:center; color:#777 ; font: 12px 'arial'">75%</td>
                        <td style="text-align:center; color:#777 ; font: 12px 'arial'">100%</td>
                      </tr>
                    </table>
                    <b-form-slider :step="0.00000001" :ticks_tooltip="true" v-if="balances.data" :min="0.0000000" :max="Number(balances.data.balance.sell_type)" v-model="ms_amount"></b-form-slider>
                    <p style=";font-family:'arial'">  ~~ USDT : SUM</p>
                    <br>
                    <input type="submit" value="Sell" class="btn btn-danger" style="width:100%;border-radius:0">
                  </form>

                  <form hidden @submit.prevent="lsell()"  class="sells selllimit">
                    <button class="btn btn-outline-secondary" type="button" style="padding-top : 0px;padding-bottom : 0px ; float:right ; width:100%;margin-bottom:5px; border-radius:0" v-if="balances.data" @click="lsbalance()"> ({{balances.data.balance.sell_type}} {{this.$route.params.sym.replace('USDT' , '')}}) : Balance </button> 
                      <div class="input-group mb-3">
                      <div class="input-group-prepend" style="direction:rtl">
                          <span v-if="balances.data" class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'; ">{{balances.data.buy_asset_type}}</span>
                        <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'; ">Price</span>
                      </div>
                      <input v-model="ls_price" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number"  style="background:none; border-style:solid;border-radius:0;border-color:grey; text-align:right;font-family:'arial' ">
                    </div>
                
                      <div class="input-group mb-3">
                        <div class="input-group-prepend" style="direction:rtl">
                          <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'" v-if="balances.data">{{balances.data.sell_asset_type}}</span>
                          <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Amount</span>  
                        </div>
                        <input v-if="leverage[$route.params.sym]" v-model="ls_amount"  :max="Number(leverage[$route.params.sym]['bmax'])" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                      </div>
                      <table style="width:98%;margin-left:2%">
                    <tr>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">0%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">25%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">50%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">75%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">100%</td>
                    </tr>
                  </table>
                  <b-form-slider :step="0.00000001" :ticks_tooltip="true" v-if="balances.data" :min="0.000000000" :max="Number(balances.data.balance.sell_type)" v-model="ls_amount"></b-form-slider>
                      <p v-if="balances.data" style=";font-family:'arial'"> {{ls_amount * ls_price}} {{balances.data.buy_asset_type}} : SUM</p>
                      <br>
                      <input type="submit" value="Sell" class="btn btn-danger" style="width:100%;border-radius:0">
                    </form>

                    <form hidden @submit.prevent="lssell()" class="sells sellstoplimit">
                    <button class="btn btn-outline-secondary" type="button" style="padding-top : 0px;padding-bottom : 0px ; float:right ; width:100%;margin-bottom:5px;margin-top:5px;border-radius:0"  v-if="balances.data" @click="lssbalance()"> ({{balances.data.balance.sell_type}} {{this.$route.params.sym.replace('USDT' , '')}} )  : Balance</button> 


                  <div class="input-group mb-3">
                    <div class="input-group-prepend" style="direction:rtl">
                      <span v-if="balances.data" class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'; ">{{balances.data.buy_asset_type}}</span>
                      <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'; ">Stop</span>
                    </div>
                    <input v-model="lss_stop" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number"  style="background:none; border-style:solid;border-radius:0;border-color:grey; text-align:right;font-family:'arial' ">
                  </div>


                                
                  <div class="input-group mb-3">
                    <div class="input-group-prepend" style="direction:rtl">
                      <span v-if="balances.data" class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'">{{balances.data.buy_asset_type}}</span>
                      <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Limit</span>  </div>
                    <input v-model="lss_limit" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                  </div>




                  <div class="input-group mb-3">
                    <div class="input-group-prepend" style="direction:rtl">
                              <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-left:none;border-right:none;border-radius:0;border-color:grey;font-family:'arial'" v-if="balances.data">{{balances.data.sell_asset_type}}</span>
                      <span class="input-group-text" id="inputGroup-sizing-default" style="background:none;border-right:none;border-radius:0;border-color:grey;color:#777;font-family:'arial'">Amount</span>  </div>
                    <input v-if="leverage[$route.params.sym]" v-model="lss_amount"  :max="Number(leverage[$route.params.sym]['bmax'])" class="form-control" step="any" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" style="background:none; border-style:solid;border-radius:0;border-color:grey;text-align: right;font-family:'arial'">
                  </div>
                  <table style="width:98%;margin-left:2%">
                    <tr>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">0%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">25%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">50%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">75%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">100%</td>
                    </tr>
                  </table>
                  <b-form-slider :step="0.00000001" :ticks_tooltip="true" v-if="balances.data" :min="0.000000000" :max="Number(balances.data.balance.sell_type)" v-model="lss_amount"></b-form-slider>



                  <p v-if="balances.data" style=";font-family:'arial'"> {{lss_amount * lss_limit}} {{balances.data.buy_asset_type}} : SUM</p>
                  <br>
                  <input type="submit" value="Sell" class="btn btn-danger" style="width:100%;border-radius:0">
               </form>

          </div>
          <div v-if="selected === 'B'" style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:90% ; margin: 5%">
            <h3 style="text-align:center">به زودی</h3>
          </div>
            </div>

          <div v-if="selected === 'B'" style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:100%">
          <div @click="selected = 'C'" class="robobutton" style="cursor:pointer; width:100% ; height:60px; padding:2%" >
            <button style="float:right; background:#ffede3 ; color:#ff651e ; border-radius:20px ; padding:5px 20px ; font-size:12px ; font-weight: 700 ; font-family: inherit" class="btn btn-light" @click="selected = 'C'"><b> CREATE</b></button>
            <i class=""><img style="width:18px;height:18px" class="bot_item_ico___3N8mR" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACf0lEQVRYR+2XP2hTURTGv+8lTSl2K6iIIHZx0uriposoDjZ/hEiLBsEOXfyDpenr1o5JS0UsgiAoRURsSJtkESx1EP8sotJBt6aCOBVFSjFNX96RJCoxJrn3pQZbzFvPuef+3ne+c+97xCZ7uMl40ARSdaSpUF0KyXTQg/TaKIBdqgJ1xi0At2imXpWvr9gyGfMfhG2/qXMzzWXGHQ4n+rSA8kkSDRxvnEI5Cy2tjzgQ+6wNpPmafz3t/5gyuRlsx0rWC5fnJcOxtBMZG6KQRLwJAD4Qy2jbs5uXJ9d0oRoDFPU9hcgRABkQ22mmVv4t0LXTnbCsfojxmGZiXhcmn1f5HIr6LwLSB8N9nuH4gm5BifiHQAnBw25eTSzJdNCFxewTAIvo9PTzTCyrqlUNaAJiDxQ8YLQc04GSqH8UYo+AzMGFAxxMvpMbl1rx7cMSBDtBprDXE1RBVQYqXh1xCE7pQP0GQ5zlUPLhTyVkItCFdXsekA4dqKqm/nGfKaFqwdQDVXPKVFA6ME6hlGP/BxTQRTP1SfLGF3uy4JmyNlUzbln77tNMnqvrLitCZWOAdENcRzk8+0wivikQvSBCpZ5RTVERKjcH8AuHk/vqAvol+/XeHchYGdA6DGP1BdjRxsEHyyqI8riMh7YVzpzwvdUNARU+SyK+BUD2g5ijmTrhFEaVr/RQaQGREQPRt18BaQeRppnqVG3gNO4IqKDQWOAkJNcDum9zaOa50w1V+Y6BVAU3Gt8aQCJCjAd6IA3666BtQdxxmjMftaZMJryHsI7XG5W/5nryLs3kBT2gwmfD2hWwQQqBFmBM0Zx9rwXUUGUUxbeGqZsKlSiw6Vr2HT6vGDQ6tjiDAAAAAElFTkSuQmCC" alt=""></i><b> </b><b> Grid Trading</b><br>
            <p style="margin-left:22px">7/24H auto buy low and sell high</p>
            
          </div>
          <div @click="selected = 'D'" class="robobutton" style="cursor:pointer; width:100% ; height:60px; padding:2%" >
            <button style="float:right; background:#ffede3 ; color:#ff651e ; border-radius:20px ; padding:5px 20px ; font-size:12px ; font-weight: 700 ; font-family: inherit" class="btn btn-light" @click="selected = 'D'"><b> CREATE</b></button>
            <i class=""><img style="width:18px;height:18px" class="bot_item_ico___3N8mR" src="data:image/png;base64,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" alt=""></i><b> </b><b> Martingale Bot</b><br>
            <p style="margin-left:22px">DCA buy, one-time sell</p>
            
          </div>
          <div @click="selected = 'E'" class="robobutton" style="cursor:pointer; width:100% ; height:60px; padding:2%" >
            <button style="float:right; background:#ffede3 ; color:#ff651e ; border-radius:20px ; padding:5px 20px ; font-size:12px ; font-weight: 700 ; font-family: inherit" class="btn btn-light" @click="selected = 'E'"><b> CREATE</b></button>
            <i class=""><img style="width:18px;height:18px" class="bot_item_ico___3N8mR" src="data:image/png;base64,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" alt=""></i><b> </b><b> Spot-Futures Arbitrage Bot</b><br>
            <p style="margin-left:22px">15%-50% APR with low risk</p>
            
          </div>
          <div @click="selected = 'F'" class="robobutton" style="cursor:pointer; width:100% ; height:60px; padding:2%" >
            <button style="float:right; background:#ffede3 ; color:#ff651e ; border-radius:20px ; padding:5px 20px ; font-size:12px ; font-weight: 700 ; font-family: inherit" class="btn btn-light" @click="selected = 'F'"><b> CREATE</b></button>
            <i class=""><img style="width:18px;height:18px" class="bot_item_ico___3N8mR" src="data:image/png;base64,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" alt=""></i><b> </b><b> Rebalancing Bot</b><br>
            <p style="margin-left:22px">Create your own index</p>
            
          </div>
          <div class="bot_list_section_title___1y6Vz">
            Moon (ultra-wide range grid trading bot)
          </div>
          </div>

          <div v-if="selected === 'C'" style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:100%; padding:5%">
            <h5 @click="selected = 'B'" style="font-family:'arial'!important; font-weight:bold"><i class="ion ion-md-arrow-round-back"></i> Trading Bots</h5>
            <br>
            <b-form-group style="width:100%"      v-slot="{ ariaDescribedby }">
              <b-form-radio-group id="btn-radios-2" v-model="grid.selected" :aria-describedby="ariaDescribedby" button-variant="outline-primary" size="lg" name="radio-btn-outline" buttons style="width:100%">
                <b-form-radio style="padding-top: 4px ; padding-bottom:4px" v-model="grid.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A" selected>Use AI strategy</b-form-radio>
                <b-form-radio style="padding-top: 4px ; padding-bottom:4px ;" v-model="grid.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Manual setting</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
                <div v-if="grid.selected === 'A'"><br><br>
                  <h4 style="text-align:center">Coming Soon!</h4>
                </div>
                <div v-if="grid.selected === 'B'"><br>
                <form @submit.prevent="gridsubmit()">
                  <div class="input-group">
                    <input required v-model="grid.lower" style="text-align:center" type="text" class="form-control input-sm" placeholder="Lower Limit (USDT)" />
                    <span class="input-group-btn" style="width:0px;"></span>
                    <input required v-model="grid.upper" style="text-align:center" type="text" class="form-control input-sm" placeholder="Upper Price (USDT)" />
                  </div><br>
                  <div class="input-group mb-3">
                    <input required v-model="grid.grid" type="text" class="form-control" placeholder="Grids" aria-label="Grids" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">2 - 200</span>
                    </div><br>
                  </div>
                  <div class="input-group mb-3" style="margin-bottom: 0!important">
                    <input required v-model="grid.total" type="text" class="form-control" placeholder="Total Investment" aria-label="Total Investment" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">USDT</span>
                    </div>
                  </div>
                  <button class="btn btn-outline-secondary" type="button" style="padding-top : 0px;padding-bottom : 0px ; float:right ; width:100%;margin-bottom:5px; border-radius:0 ; color:#8897aa!important; border-color:#8897aa!important" v-if="balances.data" @click="gridbalance()">  ({{parseFloat(this.balances.data.balance.buy_type)}} USDT) : Balance</button>
                  
                  <table style="width:98%;margin-left:2%">
                    <tr>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">0%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">25%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">50%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">75%</td>
                      <td style="text-align:center; color:#777 ; font: 12px 'arial'">100%</td>
                    </tr>
                  </table>
                  <b-form-slider style="margin-left: 8%;" :step="0.00000001" :ticks_tooltip="true" v-if="balances.data" :min="0.00" @slide-stop="lbslide" :max="Number(balances.data.balance.buy_type)" v-model="grid.total"></b-form-slider>

                  <br><br>

                  <button class="btn btn-secondary" style="width:100%">Create</button>
                  </form>
                </div>
              
          </div>      
          <div v-if="selected === 'D'" style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:100%; padding:5%">
            <h5 @click="selected = 'B'" style="font-family:'arial'!important; font-weight:bold"><i class="ion ion-md-arrow-round-back"></i> Trading Bots</h5>
          </div>          
          <div v-if="selected === 'E'" style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:100%; padding:5%">
            <h5 @click="selected = 'B'" style="font-family:'arial'!important; font-weight:bold"><i class="ion ion-md-arrow-round-back"></i> Trading Bots</h5>
          </div>          
          <div v-if="selected === 'F'" style="top:120px;position:absolute;text-align:left; color:#777;font:14px 'arial';width:100%; padding:5%">
            <h5 @click="selected = 'B'" style="font-family:'arial'!important; font-weight:bold"><i class="ion ion-md-arrow-round-back"></i> Trading Bots</h5>
          </div>                
      </b-card>
    </div>
    <b-card no-body class="mb-3 cardss" style=";height:200px ; width:70% ; margin-top:-15px">
      <div class="col-12"  id="hist" style=";padding:0">
      <b-tabs no-body class="col-12 cardss" style="height:auto;margin-bottom:50px">
        <b-tab title="Open Orders" style="width:100%">
          <table style="text-align:right; color:grey;font:14px 'arial';width:100%;" class="">
              <tr style="width:100%;box-sizing:border-box;;border-bottom:solid .5px grey">
                  <th scope="col" style="width:12% ; text-align:center; padding:0">Time</th>
                  <th scope="col" style="width:12% ; text-align:center; padding:0">Contract</th>
                  <th scope="col" style="width:12% ; text-align:center; padding:0">Type</th>
                  <th scope="col" style="width:12% ; text-align:center; padding:0">Action</th>
                  <th scope="col" style="width:12% ; text-align:center; padding:0">Remaining</th>
                  <th scope="col" style="width:12% ; text-align:center; padding:0">Done</th>
                  <th scope="col" style="width:12% ; text-align:center; padding:0">Average Price</th>
                  <th scope="col" style="width:7% ; text-align:center; padding:0">Price</th>
                  <th scope="col" style="width:16% ; text-align:center; padding:0">Operations</th>
              </tr>
              <tr v-for="(item,idx) in pending" v-bind:key="idx" style="height:100px;font-weight:bold;">

                  <td style="width:11% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{strftime("%m/%d/%y %H:%M:%S",item.create_time)}}</td>
                  <td style="width:11% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.market}}</td>      
                  <td style="width:11% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.order_type}}</td>
                  <td style="width:11% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{String(item.type).replace('sell','Sell').replace('buy','Buy')}}</td>
                  <td style="width:11% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{(parseFloat(item.left))}}</td>
                  <td style="width:11% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{(parseFloat(item.amount) - parseFloat(item.left))}}</td>
                  <td style="width:11% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.avg_price}}</td>
                  <td style="width:7% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.price}}</td>



                  <td style="width:11% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{strftime("%m/%d/%y %H:%M:%S",item.create_time)}}</td>
                  <td style="width:11% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.market}}</td>      
                  <td style="width:11% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.order_type}}</td>
                  <td style="width:11% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{String(item.type).replace('sell','Sell').replace('buy','Buy')}}</td>
                  <td style="width:11% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{(parseFloat(item.left))}}</td>
                  <td style="width:11% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{(parseFloat(item.amount) - parseFloat(item.left))}}</td>
                  <td style="width:11% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.avg_price}}</td>
                  <td style="width:7% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.price}}</td>
                  <td style="width:16% ; text-align:center ; color:red"><button class="btn btn-danger" @click="cancel(item.id)">Cancel</button></td>
              </tr>
              <tr v-if="!pending" style="height:100px">
                <th colspan="9" style="text-align:center">Nothing Yet!</th>
              </tr>
          </table>
      </b-tab>
      <b-tab title="Open Orders (Stop)" style="height:auto;margin-bottom:50px;width:100%">
          <table style="text-align:right; color:#444;font:14px 'arial';width:100%" class="">
              <tr style="width:100%;box-sizing:border-box">
                  <th scope="col" style="width:12% ; text-align:center">Time</th>
                  <th scope="col" style="width:12% ; text-align:center">Contract</th>
                  <th scope="col" style="width:12% ; text-align:center">Type</th>
                  <th scope="col" style="width:12% ; text-align:center">Action</th>
                  <th scope="col" style="width:12% ; text-align:center">Price</th>
                  <th scope="col" style="width:12% ; text-align:center">Stop Price</th>
                  <th scope="col" style="width:12% ; text-align:center">Amount</th>
                  <th scope="col" style="width:16% ; text-align:center">Operations</th>
              </tr>
              <tr v-for="(item,idx) in spending" v-bind:key="idx" style="height:100px;font-weight:bold">

                  <td style="width:12% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{strftime("%m/%d/%y %H:%M:%S",item.create_time)}}</td>
                  <td style="width:12% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.market}}</td>      
                  <td style="width:12% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.order_type}}</td>
                  <td style="width:12% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{String(item.type).replace('sell','Sell').replace('buy','Buy')}}</td>
                  <td style="width:12% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.price}}</td>
                  <td style="width:12% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.stop_price}}</td>
                  <td style="width:12% ; text-align:center ; color:green" v-if="item.type == 'buy'">{{item.amount}}</td>


                  <td style="width:12% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{strftime("%m/%d/%y %H:%M:%S",item.create_time)}}</td>
                  <td style="width:12% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.market}}</td>      
                  <td style="width:12% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.order_type}}</td>
                  <td style="width:12% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{String(item.type).replace('sell','Sell').replace('buy','Buy')}}</td>
                  <td style="width:12% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.price}}</td>
                  <td style="width:12% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.stop_price}}</td>
                  <td style="width:12% ; text-align:center ; color:red" v-if="item.type == 'sell'">{{item.amount}}</td>
                  <td style="width:16% ; text-align:center ; color:red"><button class="btn btn-danger" @click="scancel(item.order_id)">Cancel</button></td>
              </tr>
              <tr v-if="!spending" style="height:100px">
                <th colspan="9" style="text-align:center">Nothing Yet!</th>
              </tr>
          </table>
      </b-tab>

      <b-tab title="Bots" style="height:auto;margin-bottom:50px;width:100%">
          <table style="text-align:right; color:#444;font:14px 'arial';width:100%" class="">
              <tr style="width:100%;box-sizing:border-box">
                  <th scope="col" style="width:20% ;padding: 0 ; text-align:center">Time</th>
                  <th scope="col" style="width:20% ;padding: 0 ; text-align:center">Type</th>
                  <th scope="col" style="width:20% ;padding: 0 ; text-align:center">Market</th>
                  <th scope="col" style="width:20% ;padding: 0 ; text-align:center">Total Investment</th>
                  <th scope="col" style="width:20% ;padding: 0 ; text-align:center">Profit</th>
              </tr>
              <tr v-for="(item,idx) in bot" v-bind:key="idx" style="font-weight:bold">

                  <td style="width:20% ; padding:15px ; text-align:center ; color:#444">{{item.get_age}}</td>
                  <td style="width:20% ; padding:15px ; text-align:center ; color:#444">Grid</td>      
                  <td style="width:20% ; padding:15px ; text-align:center ; color:#444">{{item.market}}</td>      
                  <td style="width:20% ; padding:15px ; text-align:center ; color:#444">{{item.total}}</td>
                  <td style="width:20% ; padding:15px ; text-align:center ; color:#444">0</td>
              </tr>
              <tr v-if="!bot" style="height:100px">
                <th colspan="9" style="text-align:center">Nothing Yet!</th>
              </tr>
          </table>
      </b-tab>
      </b-tabs>
    </div>
    </b-card>









    <div style="clear:both"></div><br>
    <div class="col-12 ">
      <b-card no-body class="mb-3 col-3 cardss" style=";height:550px;color:#777;margin-top:-20px">
                      <h4 style="font-family:'arial';width:100%;height:40px;background:white;padding:8px;text-align:center;color:#777">Balance</h4>
       <table v-if="balances.data"  >
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.leverage).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">Leverage</td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.balance.buy_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.buy_asset_type}}-Balance </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.balance.sell_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.sell_asset_type}}-Balance </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.frozen.buy_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.buy_asset_type}}-Frozen </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.frozen.sell_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.sell_asset_type}}-Frozen </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.loan.buy_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.buy_asset_type}}-Loan </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.loan.sell_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.sell_asset_type}}-Loan </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.interest.buy_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.buy_asset_type}}-Interest </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.interest.sell_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.sell_asset_type}}-Interest </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.can_transfer.buy_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.buy_asset_type}}-can transfer </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(balances.data.can_transfer.sell_type).toFixed(4)}}</td>
             <td style="width:50%;text-align:right">{{balances.data.sell_asset_type}}-can transfer </td>
          </tr>
          <tr style="font-family:'arial';font-size:12px">
             <td style="width:50%;text-align:left"> {{parseFloat(liquidation).toFixed(6)}}</td>
             <td style="width:50%;text-align:right">liquidation_price </td>
          </tr>
       </table>
      </b-card>
    </div>
    <div style="clear:both"></div>
    <div class="col-12">
    </div>
    

  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import './tv'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'Trade'
  },
  updated(){
  },
  data: () => ({
    coinex: '',
    value: 5,
    searchtext: '',
    info: [],
    infoback: [],
    balance: 0,
    selected: 'A',
    boardinfo: [],
    balances: [],
    borrowamount : 0,
    borrowcoin: '',
    b_price: 0,
    lb_amount: 0,
    lb_all: 0,
    ls_amount: 0,
    lb_price: 0,
    ls_price: 0,
    lsb_amount: 0,
    lss_amount: 0,
    lsb_stop: 0,
    lss_stop: 0,
    lsb_limit: 0,
    lsb_all: 0,
    transa: '',
    transb: '',
    transamount: 0,
    lss_limit: 0,
    mb_amount: 0,
    s_price: 0,
    ms_amount: 0,
    transresult : '',
    pending: [],
    spending: [],
    repaybuymax: 0,
    repaysellmax: 0,
    repaybuymax2: 0,
    repaysellmax2: 0,
    repayamount: 0,
    repaycoin: '',
    finished: [],
    alert2: '',
    liquidation: 0,
    sfinished: [],
    mid: 0,
    leverage: [],
    wallets: [],
    transfrom: 0,
    livebalance:0,
    op: {
    },
    darkness: '',
    grid:{
      selected: 'B',
      lower: '',
      upper: '',
      grid: '',
      total: '',
    }
  }),
  mounted () {
    this.setdark()
    this.check()
    this.getc()
    this.getb()
    this.getbal(true)
    this.getlev()
    this.getw()
    this.tv()
    this.getbot()
  },
  beforeCreate () {
  },
  components: {
  },
  watch: {
    alert2: (val)=>{
      alert(val)
    },
    darkness: {
      handler: function() {
          this.tv();
      },
      deep: true
    },
    lb_all: {
        handler: function() {
            this.lbslide();
        },
        deep: true
      },
    lsb_all: {
        handler: function() {
            this.lsbslide();
        },
        deep: true
      }
  },
  methods: {
    openlist(){
      document.getElementById('listbox').hidden = !document.getElementById('listbox').hidden
      document.getElementById('tradebox').hidden = !document.getElementById('listbox').hidden
    },
    liqu() {
     this.liquidation = ((this.repaybuymax2 * 1.0185 + Number(this.balances.data.interest.buy_type) - Number(this.balances.data.balance.buy_type))/(Number(this.balances.data.balance.sell_type) - Number(this.balances.data.interest.sell_type) - this.repaysellmax2 * 1.0185)).toFixed(6)
     if(this.liquidation <= 0){
       this.liquidation = '--'
     }
    },
    async livebalances(){
      await axios
        .post('/cp_borrowlist' , {market: this.$route.params.sym})
        .then(response => {
          var allbalance = Number(this.balances.data.balance.buy_type) + (Number(this.balances.data.balance.sell_type) * Number(this.info[this.$route.params.sym].last))
          var repaybuymax = 0
          var repaysellmax = 0
          this.repaybuymax2 = 0
          this.repaysellmax2 = 0
          for (var item of response.data.data){
            if(item.coin_type === this.balances.data.buy_asset_type){
              repaybuymax += Number(item.unflat_amount)
              this.repaybuymax2 += Number(item.unflat_amount)
            }else {
              repaysellmax += Number(item.unflat_amount)
              this.repaysellmax2 += Number(item.unflat_amount)
            }
          }
          this.livebalance = allbalance - (repaybuymax + (repaysellmax * Number(this.info[this.$route.params.sym].last)))
          this.liqu()
      })
    },
    lb_allset(){
      this.lb_all = this.lb_price * this.lb_amount
    },
    lsb_allset(){
      this.lsb_all = this.lsb_limit * this.lsb_amount
    },
    lsb_allset(){
      this.lsb_all = this.lb_price * this.lb_amount
    },
    fillneg(a) {
      this.lb_price = a
      this.lsb_limit = a
    },
    fillpos(a) {
      this.ls_price = a
      this.lss_limit = a
    },
    async getbot () {
      await axios
        .get('/grid')
        .then(response => {
          console.log(response.data)
          this.bot = response.data
        }).then(() => {
        })
    },
    async getw () {
      await axios
        .get('/cp_wallets')
        .then(response => {
          this.wallets = response.data
          console.log(response)
        }).then(() => {
        })
    },
    check () {
      if (!this.$store.state.isAuthenticated) {
        const toPath = this.$route.query.to || '/login'
        this.$router.push(toPath)
      }
    },
    async checklevel (id) {
      await axios
        .get('/userinfo')
        .then(response => {
          if (response.data[0].level === 0) {
            this.$swal.fire({
              title: 'توجه',
              text: 'برای استفاده از این بخش ابتدا احراز هویت را کامل کنید',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'شروع Submit هویت',
              cancelButtonText: 'بعدا انجام میدهم'
            }).then(result => {
              if (result.isConfirmed) {
                const toPath = this.$route.query.to || '/user-level'
                this.$router.push(toPath)
              }else {
                const toPath = this.$route.query.to || '/dashboard'
                this.$router.push(toPath)
              }
            })
          }
        })
    },
    tv () {
      localStorage.setItem('tradingview-widget.IntervalWidget.quicks' , [1,30,60,3,5,15,45])
      var darkness
        darkness = this.$store.state.dark
      new TradingView.widget(
        {
        "width": 550,
        "height": 300,
        "symbol": `COINEX:${this.$route.params.sym}`,
        "timezone": "Etc/UTC",
        "theme": darkness,
        "style": "1",
        "locale": "en",
        "hide_side_toolbar": false,
        "enable_publishing": false,
        "allow_symbol_change": false,
        "container_id": "tradingview_1be21"
      }
  );
    },
    async getp () {
      await axios
        .post('/cp_pending', {sym: this.$route.params.sym , mid: this.mid})
        .then(response => {
          this.pending = response.data.data
          console.log(response)
          setTimeout(() => {
            this.getp()
          }, 5000)
        })
    },
    async getsp () {
      await axios
        .post('/cp_stop_pending', {sym: this.$route.params.sym , mid: this.mid})
        .then(response => {
          this.spending = response.data.data
          setTimeout(() => {
            this.getsp()
          }, 5000)
        })
    },
    async getlev () {
      await axios
        .get('/leverages')
        .then(response => {
          this.leverage = response.data
        })
    },
    click (name) {
      document.getElementById(name).querySelector('a').click()
      this.openlist()
    },
    async getf () {
      await axios
        .post('/cp_finished', {sym: this.$route.params.sym , mid: this.mid})
        .then(response => {
          this.finished = response.data.data
          setTimeout(() => {
            this.getf()
          }, 2000)
        })
    },
    async getsf () {
      await axios
        .post('/cp_stop_finished', {sym: this.$route.params.sym , mid: this.mid})
        .then(response => {
          this.sfinished = response.data.data
          setTimeout(() => {
            this.getf()
          }, 2000)
        })
    },
    async getc () {
      await axios
        .get('/oltradeinfo')
        .then(response => {
          this.info = response.data
          this.infoback = response.data
        })
    },
    async getb () {
      await axios
        .post('/olboardinfo',{sym: this.$route.params.sym , mid: this.mid})
        .then(response => {
          this.boardinfo = response.data
          setTimeout(() => {
              this.getb()
          }, 20)
        })
    },
    setdark(){
      this.darkness = this.$store.state.dark
      setTimeout(() => {
        this.setdark()
      }, 1000);
    },
    async getbal (a) {
      await axios
        .post('/cp_balance',{sym: this.$route.params.sym , mid: this.mid})
        .then(response => {
          this.balances = response
          this.balance = parseFloat(response.data.available).toFixed(10)
          this.mid = response.data['account_id']
          this.getp()
          this.getsp()
          this.getf()
          this.getborrowlist()
          this.livebalances()
          if(a){
            setTimeout(() => {
              this.getbal(true)
            }, 5000);
          }
        })
    },
    async getopen () {
      await axios
        .get('/cp_open')
        .then(response => {
          this.balances = response
          this.balance = parseFloat(response.data.available).toFixed(10)
          setTimeout(() => {
              this.getb()
              this.getbal(false)
          }, 2000)
        })
    },
    async cpclose (market , id) {
      await axios
        .post('/cp_close', { market: market, id: parseInt(id), mid: this.mid })
        .then(response => {
          this.getp()
          this.getbal(false)
        })
    },
    async gridsubmit(){
      await axios
        .post('/grid', { upper: this.grid.upper, lower: this.grid.lower, total: this.grid.total , grid: this.grid.grid , market: this.$route.params.sym})
        .then(response => {
          this.getp()
          this.getbal(false)
        })
    },
    async msell () {
      this.$loading(true)
      await axios
        .post('/cp_market_order', { market: this.$route.params.sym, type: 'sell', amount: (this.ms_amount - 0.000000005).toFixed(8), mid : this.mid })
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
        }).catch(()=>{
          this.$loading(false)
        })
    },
    async mbuy () {
      this.$loading(true)
      await axios
        .post('/cp_market_order', {  market: this.$route.params.sym, type: 'buy', amount: (this.mb_amount - 0.000000005).toFixed(8), mid : this.mid })
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
        }).catch(()=>{
            this.$loading(false)
          })
    },
    async lsell () {
      this.$loading(true)
      await axios
        .post('/cp_limit_order', { market: this.$route.params.sym, type: 'sell', amount: (this.ls_amount - 0.000000005).toFixed(8), price: this.ls_price, mid: this.mid })
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
        }).catch(()=>{
          this.$loading(false)
        })
    },
    async lbuy () {
      this.$loading(true)
      await axios
        .post('/cp_limit_order', {  market: this.$route.params.sym, type: 'buy', amount: ((this.lb_amount) - 0.000000005).toFixed(8) ,  price: this.lb_price, mid : this.mid })
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
        }).catch(()=>{
          this.$loading(false)
        })
    },
    async lssell () {
      this.$loading(true)
      await axios
        .post('/cp_stop_limit_order', { market: this.$route.params.sym, type: 'sell', amount: (this.lss_amount - 0.000000005).toFixed(8), price: this.lss_limit, stop_price: this.lss_stop, mid : this.mid })
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
        }).catch(()=>{
          this.$loading(false)
        })
    },
    async lsbuy () {
      this.$loading(true)
      await axios
        .post('/cp_stop_limit_order', {  market: this.$route.params.sym, type: 'buy', amount: (this.lsb_amount - 0.000000005).toFixed(8),  price: this.lsb_limit, stop_price: this.lsb_stop, mid : this.mid })
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
        }).catch(()=>{
          this.$loading(false)
        })
    },
    search () {
      this.info = {}
      var i = 0
      for (const [key, value] of Object.entries(this.infoback))
        if(key.replace('USDT' , '').includes(this.searchtext.toUpperCase())){
          this.info[key] = value
        }
    },
    async cancel (id) {
      this.$loading(true)
      await axios
        .post('/cp_cancel_order', {  market: this.$route.params.sym, id:id })
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
        })
    },
    async scancel (id) {
      this.$loading(true)
      await axios
        .post('/cp_stop_cancel_order', {  market: this.$route.params.sym, id:id , mid : this.mid})
        .then(response => {
          this.$loading(false)
          toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
          this.getsp()
        })
    },
    msbalance () {
      if(parseFloat(this.balances.data.balance.sell_type).toFixed(7) - 0.0000001 <= 0){
        this.ms_amount = 0
      }else{
        this.ms_amount = parseFloat(this.balances.data.balance.sell_type).toFixed(7) - 0.0000001
      }
    },
    mbbalance () {
      if(parseFloat(this.balances.data.balance.buy_type).toFixed(2) - 0.01 <= 0){
        this.mb_amount = 0
      }else{
        this.mb_amount = parseFloat(this.balances.data.balance.buy_type)
      }
    },
    lsbalance () {
      if(parseFloat(this.balances.data.balance.sell_type).toFixed(7) - 0.0000001 <= 0){
        this.ls_amount = 0
      }else{
        this.ls_amount = parseFloat(this.balances.data.balance.sell_type).toFixed(7) - 0.0000001
      }
    },
    lbbalance () {
      if(parseFloat(this.balances.data.balance.buy_type).toFixed(2) - 0.01 <= 0){
        this.lb_all = 0
      }else{
        this.lb_all = parseFloat(this.balances.data.balance.buy_type)}
    },
    lbslide () {
      if(this.lb_price){
        this.lb_amount = this.lb_all / this.lb_price
      }
    },
    lsbslide () {
      if(this.lsb_limit){
        this.lsb_amount = this.lsb_all / this.lsb_limit
      }
    },
    lssbalance () {
      if(parseFloat(this.balances.data.balance.sell_type).toFixed(7) - 0.0000001 <= 0){
        this.lss_amount = 0
      }else{
        this.lss_amount = parseFloat(this.balances.data.balance.sell_type).toFixed(7) - 0.0000001
      }
    },
    lsbbalance () {
      if(parseFloat(this.balances.data.balance.buy_type).toFixed(2) - 0.01 <= 0){
        this.lsb_all = 0
      }else{
        this.lsb_all = parseFloat(this.balances.data.balance.buy_type)
      }
    },
    gridbalance () {
      if(parseFloat(this.balances.data.balance.buy_type).toFixed(2) - 0.01 <= 0){
        this.lsb_all = 0
      }else{
        this.grid.total = parseFloat(this.balances.data.balance.buy_type)
      }
    },
    tabselect(id) {
      document.querySelectorAll('.taba').forEach(item => {
        item.hidden = true
      })
      document.querySelector('.' + id).hidden = false
      document.querySelector('#' + id).style.color = '#ff651e'
      if (id === 'buytab'){
        document.querySelector('#selltab').style.color = 'grey'
      }else{
        document.querySelector('#buytab').style.color = 'grey'
      }
    },
    buyselect(id) {
      document.querySelectorAll('.buys').forEach(item => {
        item.hidden = true
      })
      document.querySelector('.' + id).hidden = false
      document.querySelectorAll('.buybtn').forEach(item => {
        item.className = item.className.replace('success' , 'secondary')
      })
      document.querySelector('#' + id).className = document.querySelector('#' + id).className .replace('secondary' , 'success')
    },
    sellselect(id) {
      document.querySelectorAll('.sells').forEach(item => {
        item.hidden = true
      })
      document.querySelector('.' + id).hidden = false
       document.querySelectorAll('.sellbtn').forEach(item => {
        item.className = item.className.replace('danger' , 'secondary')
      })
      document.querySelector('#' + id).className = document.querySelector('#' + id).className .replace('secondary' , 'danger')
    },
    async getborrowlist () {
    await axios
    .post('/cp_borrowlist' , {market: this.$route.params.sym})
    .then(response => {
      this.repaybuymax = 0
      this.repaysellmax = 0
      for (var item of response.data.data){
        if(item.coin_type === this.balances.data.buy_asset_type){
          this.repaybuymax += Number(item.unflat_amount)
        }else {
          this.repaysellmax += Number(item.unflat_amount)
        }
      }
    })
    },
    transchange(){
    },
    transfer () {
      setTimeout(() => {
        document.querySelector('#transamount').addEventListener('change' , ()=>{
          this.transamount = document.querySelector('#transamount').value
        })
        document.querySelector('#aaaa').addEventListener('change', ()=>{
          this.transa = document.querySelector('#aaaa').value
          if (document.querySelector('#aaaa').value === '2'){
            if(document.querySelector('#bbbb').value === this.balances.data.buy_asset_type){

              document.querySelector('#transbal').innerHTML = this.balances.data.can_transfer.buy_type
            }
            if(document.querySelector('#bbbb').value === this.balances.data.sell_asset_type){

              document.querySelector('#transbal').innerHTML =  this.balances.data.can_transfer.sell_type
            }
          }if (document.querySelector('#aaaa').value === '1'){
            if(document.querySelector('#bbbb').value === this.balances.data.buy_asset_type){
              if(this.wallets[this.balances.data.buy_asset_type]['balance'].available){
                document.querySelector('#transbal').innerHTML =  this.wallets[this.balances.data.buy_asset_type]['balance'].available
              }else{
                document.querySelector('#transbal').innerHTML =  0
              }
              
            }
            if(document.querySelector('#bbbb').value === this.balances.data.sell_asset_type){
              if(this.wallets[this.balances.data.sell_asset_type]['balance'].available){
                document.querySelector('#transbal').innerHTML =  this.wallets[this.balances.data.sell_asset_type]['balance'].available
              }else{
                document.querySelector('#transbal').innerHTML =  0
              }
              
            }
          }
        })
        document.querySelector('#bbbb').addEventListener('change', ()=>{
          this.transb = document.querySelector('#bbbb').value
          if (document.querySelector('#aaaa').value === '2'){
            if(document.querySelector('#bbbb').value === this.balances.data.buy_asset_type){

              document.querySelector('#transbal').innerHTML = this.balances.data.can_transfer.buy_type
            }
            if(document.querySelector('#bbbb').value === this.balances.data.sell_asset_type){

              document.querySelector('#transbal').innerHTML =  this.balances.data.can_transfer.sell_type
            }
          }if (document.querySelector('#aaaa').value === '1'){
            if(document.querySelector('#bbbb').value === this.balances.data.buy_asset_type){
              if(this.wallets[this.balances.data.buy_asset_type]['balance'].available){
                document.querySelector('#transbal').innerHTML =  this.wallets[this.balances.data.buy_asset_type]['balance'].available
              }else{
                document.querySelector('#transbal').innerHTML =  0
              }
              
            }
            if(document.querySelector('#bbbb').value === this.balances.data.sell_asset_type){
              if(this.wallets[this.balances.data.sell_asset_type]['balance'].available){
                document.querySelector('#transbal').innerHTML =  this.wallets[this.balances.data.sell_asset_type]['balance'].available
              }else{
                document.querySelector('#transbal').innerHTML =  0
              }
              
            }
          }
        })
        document.querySelector('#transbal').addEventListener('click', ()=>{
          document.querySelector('#transamount').value = document.querySelector('#transbal').innerHTML
          this.transamount = document.querySelector('#transamount').value
        })
      }, 500);
      this.$swal.fire({
        title: 'Transfer',
        html:'<select style="padding:0;text-align:center" id="aaaa" ' +'" class="form-control">' + '<option value="" disabled selected>Choose Action</option>' + `<option value="1">From Asset</option>` + `<option value="2">To Asset</option>` + '</select>' + '<br>' + '<select style="padding:0;text-align:center"  id="bbbb" class="form-control">'+ '<option value="" disabled selected>Coin Type</option>' + `<option value="${this.balances.data.buy_asset_type}">${this.balances.data.buy_asset_type}</option>` + `<option value="${this.balances.data.sell_asset_type}">${this.balances.data.sell_asset_type}</option>` + '</select>' + '<br>'+ 'Balance:'+ '<a class="btn btn-dark" style="padding: 0px 30px;margin:2px" href="#" id="transbal"></a>' +'<input id="transamount" placeholder="Amount" class="form-control"></input>',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'cancel',
        showLoaderOnConfirm: true,
        },
        )
        .then((result) => {
          if (result.isConfirmed) {
            this.submittransfer()
          }
        }
      )
    },
    async submittransfer () {
      var from_account = 0
      var to_account = 0
    if(this.transa === '1' ){
      to_account = parseInt(this.balances.data.account_id)
    }
    if(this.transa === '2' ){
      from_account = parseInt(this.balances.data.account_id)
    }
    const formData = {
          fa: from_account ,
          ta: to_account,
          amount: this.transamount ,
          coin:this.transb
        }
    await axios
      .post('/cp_transfer' , formData)
      .then(response => {
        this.getw()
        this.getbal(false)
          if(!response.data){
            toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
          }else{
            toast({
            message: 'Low Balance',
            type: 'is-danger',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          }
        })
  },
    borrow () {
      var allbalance = Number(this.balances.data.can_transfer.buy_type) + (Number(this.balances.data.can_transfer.sell_type) * Number(this.info[this.$route.params.sym].last))
      var maxbuy = allbalance * parseFloat(this.balances.data.leverage) * 0.8
      var maxsell = (maxbuy / this.info[this.$route.params.sym].last)
      setTimeout(() => {
        document.querySelector('#bbbbb').addEventListener('change', ()=>{

            this.borrowcoin = document.querySelector('#bbbbb').value

            if(document.querySelector('#bbbbb').value === this.balances.data.buy_asset_type){

              document.querySelector('#borrowmax').innerHTML = maxbuy
            }
            if(document.querySelector('#bbbbb').value === this.balances.data.sell_asset_type){

              document.querySelector('#borrowmax').innerHTML =  maxsell
          }
        })
        document.querySelector('#borrowmax').addEventListener('click', ()=>{
          document.querySelector('#borrowamount').value = document.querySelector('#borrowmax').innerHTML
          this.borrowamount = document.querySelector('#borrowamount').value
        })
        document.querySelector('#borrowamount').addEventListener('change', ()=>{
          this.borrowamount = document.querySelector('#borrowamount').value
        })
      }, 500);
      this.$swal.fire({
        title: 'Borrow',
        html:'<select style="padding:0;text-align:center"  id="bbbbb" class="form-control">' + '<option value="" disabled selected>Coin Type </option>' + `<option value="${this.balances.data.buy_asset_type}">${this.balances.data.buy_asset_type}</option>` + `<option value="${this.balances.data.sell_asset_type}">${this.balances.data.sell_asset_type}</option>` + '</select>' + '<br>'+ 'Maximum Amount:'+ '<a class="btn btn-dark" style="padding: 0px 30px;margin:2px" href="#" id="borrowmax"></a>' +'<input id="borrowamount" placeholder="Amount" class="form-control"></input>',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'cancel',
        showLoaderOnConfirm: true,
        },
        )
        .then((result) => {
          if (result.isConfirmed) {

            this.submitborrow().then(()=>{
             
            })
          }
        }
      )
    },
    async submitborrow () {
    await axios
    .post('/cp_borrow' , {amount: this.borrowamount , coin:this.borrowcoin , market: this.$route.params.sym})
    .then(response => {
          if(response.data.loan_id){
            toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
          }else{
            toast({
            message: response.data,
            type: 'is-danger',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          }
        })
  },
    repay () {
      var maxbuyrepay = this.repaybuymax
      var maxsellrepay = this.repaysellmax
      setTimeout(() => {
        document.querySelector('#bbbbbb').addEventListener('change', ()=>{

            this.repaycoin = document.querySelector('#bbbbbb').value

            if(document.querySelector('#bbbbbb').value === this.balances.data.buy_asset_type){

              document.querySelector('#repaymax').innerHTML = maxbuyrepay
            }
            if(document.querySelector('#bbbbbb').value === this.balances.data.sell_asset_type){

              document.querySelector('#repaymax').innerHTML =  maxsellrepay
          }
        })
        document.querySelector('#repaymax').addEventListener('click', ()=>{
          document.querySelector('#repayamount').value = document.querySelector('#repaymax').innerHTML
          this.repayamount = document.querySelector('#repayamount').value
        })
        document.querySelector('#repayamount').addEventListener('change', ()=>{
          this.repayamount = document.querySelector('#repayamount').value
        })
      }, 500);
      this.$swal.fire({
        title: 'Repay',
        html:'<select  style="padding:0;text-align:center"  id="bbbbbb" class="form-control">' + '<option value="" disabled selected>Coint Type</option>' + `<option value="${this.balances.data.buy_asset_type}">${this.balances.data.buy_asset_type}</option>` + `<option value="${this.balances.data.sell_asset_type}">${this.balances.data.sell_asset_type}</option>` + '</select>' + '<br>'+ 'Maximum Amount:'+ '<a class="btn btn-dark" style="padding: 0px 30px;margin:2px" href="#" id="repaymax"></a>' +'<input id="repayamount" placeholder="Amount" class="form-control"></input>',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'cancel',
        showLoaderOnConfirm: true,
        },
        )
        .then((result) => {
          if (result.isConfirmed) {

            this.submitrepay().then(()=>{
             
            })
          }
        }
      )
    },
    async submitrepay () {
    await axios
    .post('/cp_repay' , {amount: this.repayamount , coin:this.repaycoin , market: this.$route.params.sym})
    .then(response => {
          if(!response.data){
            toast({
            message: 'Done',
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          this.getp()
          this.getbal(false)
          }else{
            toast({
            message: response.data,
            type: 'is-danger',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
          })
          document.querySelectorAll('.delete').forEach(item => {
            item.addEventListener('click' , () => {
              item.parentElement.remove()
            })
            setTimeout(() => {
              item.parentElement.remove()
            }, 3000);
          })
          }
        })
  },
    strftime(sFormat, date) {
      if (!(date instanceof Date)) date = new Date();
      var nDay = date.getDay(),
        nDate = date.getDate(),
        nMonth = date.getMonth(),
        nYear = date.getFullYear(),
        nHour = date.getHours(),
        aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        isLeapYear = function() {
          if ((nYear&3)!==0) return false;
          return nYear%100!==0 || nYear%400===0;
        },
        getThursday = function() {
          var target = new Date(date);
          target.setDate(nDate - ((nDay+6)%7) + 3);
          return target;
        },
        zeroPad = function(nNum, nPad) {
          return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
        };
      return sFormat.replace(/%[a-z]/gi, function(sMatch) {
        return {
          '%a': aDays[nDay].slice(0,3),
          '%A': aDays[nDay],
          '%b': aMonths[nMonth].slice(0,3),
          '%B': aMonths[nMonth],
          '%c': date.toUTCString(),
          '%C': Math.floor(nYear/100),
          '%d': zeroPad(nDate, 2),
          '%e': nDate,
          '%F': date.toISOString().slice(0,10),
          '%G': getThursday().getFullYear(),
          '%g': ('' + getThursday().getFullYear()).slice(2),
          '%H': zeroPad(nHour, 2),
          '%I': zeroPad((nHour+11)%12 + 1, 2),
          '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
          '%k': '' + nHour,
          '%l': (nHour+11)%12 + 1,
          '%m': zeroPad(nMonth + 1, 2),
          '%M': zeroPad(date.getMinutes(), 2),
          '%p': (nHour<12) ? 'AM' : 'PM',
          '%P': (nHour<12) ? 'am' : 'pm',
          '%s': Math.round(date.getTime()/1000),
          '%S': zeroPad(date.getSeconds(), 2),
          '%u': nDay || 7,
          '%V': (function() {
                  var target = getThursday(),
                    n1stThu = target.valueOf();
                  target.setMonth(0, 1);
                  var nJan1 = target.getDay();
                  if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
                  return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
                })(),
          '%w': '' + nDay,
          '%x': date.toLocaleDateString(),
          '%X': date.toLocaleTimeString(),
          '%y': ('' + nYear).slice(2),
          '%Y': nYear,
          '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
          '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
        }[sMatch] || sMatch;
      });
    }
}
}
</script>
<style>
.txt{
  color:#444
}
body{
  overflow-y:hidden
}
.btn-outline-primary:active, .btn-outline-primary.active, .show > .btn-outline-primary.dropdown-toggle{
  background-color:rgb(255, 111, 44)!important
}
.btn-outline-primary:hover{
  background-color:rgb(255, 111, 44)!important
}
.btn-outline-primary {
  border-color:rgb(255, 111, 44)!important;
}
.btn-outline-primary{
  color:rgb(255, 111, 44);
}
.cent{
  text-align: center;
}
.mb-3{
    border-radius: 0;
    float:left;
    box-sizing: border-box;
}
.cardss{
    background:#fff;
    box-sizing: border-box;
    padding: 0;
}
th{
    padding: 10px;
}
td{
    padding:10px
}
.robobutton:hover{
  background: #ececec;
}
p{
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 5px;
}
#trader .nav-link{
height:99%;
background: rgba(0, 0, 0, 0)!important;
border-radius: 0!important;
border-style: none!important;
font-weight:bold;
color: grey!important;
}
#trader .nav-link.active{
color: rgb(255, 111, 44)!important;
border-radius: 0!important;
font-weight:bold;
border-style: none!important;
}
#hist ul{
  border-style: none!important;
  color: grey;
}
.btn-cur{
  width: 100%;
  height: 100%;
}
.bot_list_section_title___1y6Vz:before {
    display: inline-block;
    width: 5px;
    height: 13px;
    margin-right: 14px;
    vertical-align: middle;
    background: #ff651e;
    border-radius: 2px;
    content: "";
}
.bot_list_section_title___1y6Vz{
  padding:2%;
  padding-left:3%;
  background: #ececec;
}
.btn-cur:hover{
  background-color: grey;
  cursor: pointer;
}
.act{
  background-color: white!important;;
  color: #777;
}
.act:hover{
  color: #777;
}
</style>
<style lang="scss">
.notification {
  background-color: whitesmoke;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
  margin:5px
}

.notification a:not(.button):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}

.notification strong {
  color: currentColor;
}

.notification code,
.notification pre {
  background: white;
}

.notification pre code {
  background: transparent;
}

.notification > .delete {
  right: 0.5rem;
  position: absolute;
  top: 0.5rem;
}

.notification .title,
.notification .subtitle,
.notification .content {
  color: currentColor;
}

.notification.is-white {
  background-color: white;
  color: #0a0a0a;
}

.notification.is-#777 {
  background-color: #0a0a0a;
  color: white;
}

.notification.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-dark {
  background-color: #363636;
  color: #fff;
}

.notification.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.notification.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.notification.is-link {
  background-color: #485fc7;
  color: #fff;
}

.notification.is-link.is-light {
  background-color: #eff1fa;
  color: #3850b7;
}

.notification.is-info {
  background-color: #3e8ed0;
  color: #fff;
}

.notification.is-info.is-light {
  background-color: #eff5fb;
  color: #296fa8;
}

.notification.is-success {
  background-color: #48c78e;
  color: #fff;
}

.notification.is-success.is-light {
  background-color: #effaf5;
  color: #257953;
}

.notification.is-warning {
  background-color: #ffe08a;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-warning.is-light {
  background-color: #fffaeb;
  color: #946c00;
}

.notification.is-danger {
  background-color: #f14668;
  color: #fff;
}

.notification.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}
.delete, .modal-close {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: rgba(10, 10, 10, 0.2);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  pointer-events: auto;
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 20px;
  max-height: 20px;
  max-width: 20px;
  min-height: 20px;
  min-width: 20px;
  outline: none;
  position: relative;
  vertical-align: top;
  width: 20px;
}

.delete::before, .modal-close::before, .delete::after, .modal-close::after {
  background-color: white;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.delete::before, .modal-close::before {
  height: 2px;
  width: 50%;
}

.delete::after, .modal-close::after {
  height: 50%;
  width: 2px;
}

.delete:hover, .modal-close:hover, .delete:focus, .modal-close:focus {
  background-color: rgba(10, 10, 10, 0.3);
}

.delete:active, .modal-close:active {
  background-color: rgba(10, 10, 10, 0.4);
}

.is-small.delete, .is-small.modal-close {
  height: 16px;
  max-height: 16px;
  max-width: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;
}

.is-medium.delete, .is-medium.modal-close {
  height: 24px;
  max-height: 24px;
  max-width: 24px;
  min-height: 24px;
  min-width: 24px;
  width: 24px;
}

.is-large.delete, .is-large.modal-close {
  height: 32px;
  max-height: 32px;
  max-width: 32px;
  min-height: 32px;
  min-width: 32px;
  width: 32px;
}
.d-inline-block {
  width:90%!important;
  margin-right:5%!important
}
.slider-horizontal{
  width:90%!important;
  margin-right:5%!important
}
.slider-handle .min-slider-handle{
  background-color: grey!important;
}
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 , th {
  font-family:'Yekan'!important
}
</style>
