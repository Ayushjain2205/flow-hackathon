import React from "react"
import SendMoney from "./templates/SendMoney"
import Reminder from "./templates/Reminder"
import BuyNFT from "./templates/BuyNFT"
import Task from "./templates/Task"
import SmartContract from "./templates/SmartContract"
import Debug from "./templates/Debug"
import WalletHealth from "./templates/WalletHealth"
import Drop from "./templates/Drop"

const Template = ({ template }) => {
  let component

  switch (template) {
    case "SendMoney":
      component = <SendMoney />
      break
    case "Reminder":
      component = <Reminder />
      break
    case "Buy":
      component = <BuyNFT />
      break
    case "Task":
      component = <Task />
      break
    case "SmartContract":
      component = <SmartContract />
      break
    case "Debug":
      component = <Debug />
      break
    case "WalletHealth":
      component = <WalletHealth />
      break
    case "Drop":
      component = <Drop />
      break
    default:
      component = <div>Oops, template not found!</div>
      break
  }

  return component
}

export default Template
