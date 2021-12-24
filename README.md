# detrust-subgraph
Subgraph of DeTrust

## Deploy to Subgraph Studio

### Install tools: graph-cli, etc

  ```
    npm install
  ```

### Initialize your Subgraph

  ```
    npx graph init --studio <SUBGRAPH_SLUG>
  ```

### Graph Auth

  ```
    npx graph auth --studio <DEPLOY_KEY>
  ```

### Create subgraph.yaml according to network

* For mainnet:

  ```
    npm run prepare:mainnet
  ```

* For ropsten:

  ```
    npm run prepare:ropsten
  ```

### Build
  ```
    npx graph codegen && npx graph build
  ```

### Deploying a Subgraph to Subgraph Studio

  ```
    npx graph deploy --studio <SUBGRAPH_SLUG>
  ```

## References

* [Deploy a Subgraph to the Subgraph Studio | Graph Docs](https://thegraph.com/docs/developer/deploy-subgraph-studio)
