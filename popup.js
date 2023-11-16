document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("header_network")
    .addEventListener("click", getOpenNetwork);
  document
    .getElementById("network_item")
    .addEventListener("click", getSelectedNetwork);
  document.getElementById("add_network").addEventListener("click", setNetwork);
  document
    .getElementById("accountCreate")
    .addEventListener("click", openCreate);
  document.getElementById("loginAccount").addEventListener("click", loginUser);
  document.getElementById("openCreate").addEventListener("click", createUser);
  document.getElementById("goHomePage").addEventListener("click", goHomeBack);
  document.getElementById("sign-Up").addEventListener("click",signUp);
  document.getElementById("loginUp").addEventListener("click",logIn);
  document.getElementById("goBack").addEventListener("click",goBack);
  document.getElementById("transferFund").addEventListener("click",handler);
  document.getElementById("add_new_token").addEventListener("click",addToken);
  document.getElementById("add_new_account").addEventListener("click",addAccount);
  document.getElementById("import_goBack").addEventListener("click",gobackImportToken);
  document.getElementById("close_import_account").addEventListener("click",closeImportAccount);
  document.getElementById("userAddress").addEventListener("click",copyAddress);
  document.getElementById("open_Transfer").addEventListener("click",openTransfer);
  document.getElementById("openAccountImport").addEventListener("click",openImportAccount);
  document.getElementById("open_import").addEventListener("click",openImportToken);
  document.getElementById("open_assets").addEventListener("click",openAssets);
  document.getElementById("logout").addEventListener("click",logOut);
  document.getElementById("open_activity").addEventListener("click",openActivity);
  // document.getElementById("accountList").addEventListener("click",changedAccount);
});
let address;
let privateKey;
let providerUrl="https://polygon-mumbai.drpc.org";

function getOpenNetwork() {
  {
    document.getElementById("network").style.display == "block"
      ? (document.getElementById("network").style.display = "none")
      : (document.getElementById("network").style.display = "block");
  }
}
function getSelectedNetwork(e) {
  let element = document.getElementById("selected_network");
  element.innerHTML = e.target.innerHTML;
  if (e.target.innerHTML == "Ethereum Mainnet") {
    (providerUrl = "https://eth.drpc.org"),
      (document.getElementById("network").style.display = "none");
  } else if (e.target.innerHTML == "Polygon Mumbai") {
    providerUrl = "https://polygon-mumbai.drpc.org";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML == "Goreli TestNetwork") {
    providerUrl = "https://goerli.drpc.org/";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML == "Sepolia TestNetwork") {
    providerUrl = "https://sepolia.drpc.org";
    document.getElementById("network").style.display = "none";
  }
  console.log(providerUrl);
}
function setNetwork() {
  document.getElementById("network").style.display = "none";
}
function openCreate() {
  document.getElementById("createAccount").style.display = "block";
  document.getElementById("loginUser").style.display = "none";
}
function loginUser() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("loginUser").style.display = "block";
}
function createUser() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("createpopUp").style.display = "block";
}
function goHomeBack() {
  document.getElementById("createpopUp").style.display = "none";
  document.getElementById("loginUser").style.display = "block";
}

function signUp(){
  const name=document.getElementById("signup_name").value;
  const email=document.getElementById("signup_email").value;
  const password=document.getElementById("signup_password").value;
  const confirmPassword=document.getElementById("signup_confirmPassword");
  if(!name ||!email ||!password ||!confirmPassword) throw new Error(alert("Input field is missing"));
  document.getElementById("field").style.display="none";
  document.getElementById("center").style.display="block";
  const wallet=new ethers.Wallet.createRandom();
  const userData={
    name:name,
    email:email,
    password:password,
    confirmPassword:password,
    address:wallet.address,
    privateKey:wallet.privateKey,
    mnemonic:wallet.mnemonic.phrase
  }
  const url="https://webwallet-4cf36e9cc8d5.herokuapp.com/api/v1/user/signup";
  fetch(url,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(userData),
  }).then((response)=>response.json()).then((result)=>{
    console.log(result);
    document.getElementById("createdAddress").innerHTML=wallet.address;
    document.getElementById("createdPrivateKey").innerHTML=wallet.privateKey;
    document.getElementById("createdMnemonic").innerHTML=wallet.mnemonic.phrase
    document.getElementById("center").style.display="none";
    document.getElementById("heading").style.display="none";
    document.getElementById("sign-Up").style.display="none";
    document.getElementById("accountData").style.display="block";
    const data={
      address:wallet.address,
      privateKey:wallet.privateKey,
      menmonic:wallet.mnemonic.phrase
    }
    const jsonStr=JSON.stringify(data);
    localStorage.setItem("userWallet",jsonStr);
    setTimeout(() => {
      document.getElementById("createpopUp").style.display="none";
      document.getElementById("loginUser").style.display="block";
    }, 60000);
  });
}
async function logIn(){
  document.getElementById("loginUser").style.display="none";
  document.getElementById("center").style.display="block";
const email=document.getElementById("login_email").value;
const password=document.getElementById("login_password").value;
if(!email ||!password)return new Error("Input field is missing");
const user={
  email:email,
  password:password
};
const url="https://webwallet-4cf36e9cc8d5.herokuapp.com/api/v1/user/login";
fetch(url,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(user),
}).then((response)=>response.json()).then((result)=>{
  const userWallet={
    address:result.data.user.address,
    privateKey:result.data.user.privateKey,
    mnemonic:result.data.user.mnemonic.phrase
  };
  const jsonObj=JSON.stringify(userWallet);
  localStorage.setItem("userWallet",jsonObj);
   window.location.reload();
});
}
function goBack(){
  document.getElementById("transfer_form").style.display="none";
  document.getElementById("home").style.display="block";
}
function handler(){
  const address=document.getElementById("address").value;
  const amount=document.getElementById("amount").value;
  const provider=new ethers.JsonRpcProvider(providerUrl);
  const wallet=new ethers.Wallet(privateKey,provider);
  const tx={
    address:address,
    amount:ethers.parseEther(amount)
  };
  wallet.sendTransaction((tx).then((txObj)=>{
    console.log("txHash",txObj.hash);
    document.getElementById("transfer_center").style.display="none";
    let a=document.getElementById("link");
    a.href=`https://mumbai.polygonscan.com/tx${txObj.hash}`
    document.getElementById("link").style.display="block";
  }));
}
async function addToken(){
  const address=document.getElementById("token_address").value;
  const name=document.getElementById("token_name").value;
  const symbol=document.getElementById("token_symbol").value;
  const data={
    address:address,
    name:name,
    symbol:symbol
  }
  const url=`https://webwallet-4cf36e9cc8d5.herokuapp.com/api/v1/tokens/createtoken`;
  fetch(url,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data),
  }).then((response)=>response.json()).then((data)=>{
    console.log(data);
    alert("import token successfully");
    window.location.reload();
  })
}
async function addAccount(){
const privateKey=document.getElementById("add_account_private_key").value;
const provider=new ethers.JsonRpcProvider(providerUrl);
const wallet=new ethers.Wallet(privateKey,provider);
const data={
  address:wallet.address,
  privateKey:privateKey
};
const url="https://webwallet-4cf36e9cc8d5.herokuapp.com/api/v1/accounts/createaccount";
fetch(url,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(data),
}).then((response)=>response.json()).then((data)=>{
  alert("Account Imported Successfully");
  window.location.reload();
}).catch((error)=>{
  console.log(error);
});

}
function gobackImportToken(){
  document.getElementById("import_token").style.display="none";
  document.getElementById("home").style.display="block";
}
function closeImportAccount(){
  document.getElementById("import_account").style.display="none";
  document.getElementById("home").style.display="block";
}
function copyAddress(){
  navigator.clipboard.writeText(address);
}
function checkBalance(address){
  const provider=new ethers.JsonRpcProvider(providerUrl);
  provider.getBalance(address).then((balance)=>{
    const balanceInETH=ethers.formatEther(balance);
    document.getElementById("accountBalance").innerHTML=balanceInETH.slice(0,7);
    document.getElementById("userAddress").innerHTML=`${address.slice(0,6)}...${address.slice(36)}`
  });
}
function openTransfer(){
  document.getElementById("transfer_form").style.display="block";
  document.getElementById("home").style.display="none";
}
function openImportAccount(){
  document.getElementById("import_account").style.display="block";
  document.getElementById("home").style.display="none";
}
function openImportToken(){
  document.getElementById("import_token").style.display="block";
  document.getElementById("home").style.display="none";
}
function openAssets(){
  document.getElementById("activity").style.display="none";
  document.getElementById("assets").style.display="block";
}
function logOut(){
  localStorage.removeItem("userWallet");
  window.location.reload();
}
function openActivity(){
  document.getElementById("assets").style.display="none";
  document.getElementById("activity").style.display="block";
}

function myFunction(){
  let str=localStorage.getItem("userWallet");
  const parseObj=JSON.parse(str);
  if(parseObj?.address){
    document.getElementById("loginUser").style.display = "none";
    document.getElementById("createAccount").style.display="none";
    document.getElementById("home").style.display="block";
    address=parseObj.address;
    privateKey=parseObj.privateKey;
    checkBalance(parseObj.address);

  };
  const tokenRender=document.querySelector(".assets");
  let element="";
  const url='https://webwallet-4cf36e9cc8d5.herokuapp.com/api/v1/tokens/alltokens';
  fetch(url).then((response)=>response.json()).then((result)=>{
    result.data.tokens.map((token)=>(
      element+=`<div class="assets_item">
      <img
      src="./assets/theblockchaincoders.png"
      alt=""
      class="assets_item_img"
      />
      <span>${token.address.slice(0,15)}...</span>
      <span>${token.symbol}</span>
      </div>`
      ));
      tokenRender.innerHTML=element;
  }).catch((error)=>{
    console.log(error);
  });
const accountRender=document.querySelector(".accountList");
  
fetch('https://webwallet-4cf36e9cc8d5.herokuapp.com/api/v1/accounts/allaccounts').then((response)=>response.json()).then((data)=>{
let accounts="";
  data.data.accounts.map((account,i)=>(accounts+=`<div class="lists">
  <p>${i + 1}</p>
  <p class="accountValue" data-address=${account.address} data-privateKey=${account.privateKey}>${account.address.slice(0,25)}...${account.address.slice(39)}</p>
  </div>`
  ));
  accountRender.innerHTML=accounts;
  const accountValueElements=document.querySelectorAll(".accountValue");
  accountValueElements.forEach((element)=>{
    element.addEventListener("click",function(){
      changedAccount(element);
    });
  });
});
};
function changedAccount(clickElements){
  const address=clickElements.getAttribute("data-address");
  const privateKey=clickElements.getAttribute("data-privateKey");
  const userWallet={
    address:address,
    privateKey:privateKey,
    mnemonic:"Changed"
  };
  const jsonObj=JSON.stringify(userWallet);
  localStorage.setItem("userWallet",jsonObj);
  window.location.reload();
}
window.onload=myFunction;