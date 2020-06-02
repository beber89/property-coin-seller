using Nethereum.Web3;
@inject IJSRuntime JSRuntime;


namespace blazor_app 
{
  public class Web3Service {
    private Web3 _web3;

    public Web3Service() {
      _web3 = new Web3("https://rinkeby.infura.io/v3/aaa6614b170b4067b7b1cd2f616bda18");
    }

    public Web3 getWeb3() {
      return _web3;
    }
  }
}