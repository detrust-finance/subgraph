import { BigInt } from "@graphprotocol/graph-ts"
import {
  DeTrust,
  TrustAdded,
  TrustFinished,
  TrustFundAdded,
  TrustReleased
} from "../generated/DeTrust/DeTrust"
import { Trust } from "../generated/schema"

export function handleTrustAdded(event: TrustAdded): void {
  let trust = new Trust(event.params.trustId.toHex())

  trust.name = event.params.name
  trust.settlor = event.params.settlor
  trust.beneficiary = event.params.beneficiary
  trust.nextReleaseTime = event.params.startReleaseTime

  // Entities can be written to the store with `.save()`
  trust.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.addTrustFromBalance(...)
  // - contract.getBalance(...)
  // - contract.getTrustListAsBeneficiary(...)
  // - contract.getTrustListAsSettlor(...)
}

export function handleTrustFinished(event: TrustFinished): void {}

export function handleTrustFundAdded(event: TrustFundAdded): void {}

export function handleTrustReleased(event: TrustReleased): void {}
