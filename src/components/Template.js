import React from "react"
import SendMoney from "./templates/SendMoney"
import Reminder from "./templates/Reminder"
import BuyNFT from "./templates/BuyNFT"
import Task from "./templates/Task"
import SmartContract from "./templates/SmartContract"
import Debug from "./templates/Debug"
import WalletHealth from "./templates/WalletHealth"
import Drop from "./templates/Drop"
import None from "./templates/None"

const Template = ({ template }) => {
  let component

  switch (template) {
    case "SendMoney":
      component = <SendMoney />
      break
    case "Reminder":
      component = <Reminder />
      break
    case "buyNFT":
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
    case "News":
      component = (
        <None text="Flow Price Prediction as $300 Million Pushes FLOW Up 35% – What's Going On?" />
      )
      break
    default:
      component = <None text={template} />
      break
  }

  return component
}

export default Template
