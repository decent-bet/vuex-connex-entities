# vue-connex-entities
Vue connex entities


### Bootstrapping

#### Adding Contract Entities to plugin middleware
```typescript
Vue.use(ConnexEntityContract, {
    entities: [
      { name: 'Energy', contract: EnergyTokenContract }, 
      { name: 'DBET', contract: DBETVETTokenContract }
    ]
});
```

#### Creating Contract Import
```typescript
const EnergyTokenContractAbi = require('./Energy');

const EnergyContractImport: ContractImport = {
  raw: {
    abi: EnergyTokenContractAbi.abi
  },
  address: {
    '0x27': '0x0000000000000000000000000000456E65726779',
    '0x4a': '0x0000000000000000000000000000456E65726779'
  }
};

```

#### Create Contract Entity
A contract entity maps to a contract import using the `@ConnexContract` and inherits a `ContractService` instance. An `IConnexContract` interface is required to access this property.

```typescript

@ConnexContract({
  import: EnergyContractImport
})
export class EnergyTokenContract implements IConnexContract {
  contractService: ContractService;
  // ...
}
```

#### Requesting Connex and Comet
When required, request access to the external wallet and middleware will create the contract entities in the Vue instance variable `$contractEntities`.

The following instance variables are available:

* `$requestExternalWalletAccess`: Request access to external wallet
* `$contractEntities`: The contract entities created after external wallet access sucess.
* `$connex`: Access to the static ConnexService

```typescript
  async loginComet() {
    await this.$requestExternalWalletAccess();

    const vthoBalance = await this.$contractEntities.Energy.balanceOf(this.$connex.defaultAccount);
  }
```