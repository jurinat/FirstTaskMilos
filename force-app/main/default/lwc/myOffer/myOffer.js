import { LightningElement, wire, api, track } from "lwc";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { NavigationMixin } from "lightning/navigation";
import getOffrs from "@salesforce/apex/MyOfferController.getOffrs";

export default class MyOffer extends NavigationMixin(LightningElement) {
  @api recordId;
  @track offer;
  @track error;

  @wire(getOffrs, { accountId: "$recordId" })
  wiredAccount({ error, data }) {
    if (data) {
      this.offer = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.offer = undefined;
    }
  }

  clickedAll() {
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url:
          "https://curious-impala-cypd70-dev-ed.lightning.force.com/lightning/o/MyOffer__c/list?filterName=00B7R00000B2KW8UAN"
      }
    });
  }

  clickOnOffer(event) {
    let id = event.target.id;
    let newId = id.slice(0, id.length - 3);
    window.location.assign(
      "https://curious-impala-cypd70-dev-ed.lightning.force.com/lightning/r/MyOffer__c/" +
        newId +
        "/view"
    );
  }

  navigateToNewContactWithDefaults() {
    var date = new Date();
    date.setDate(date.getDate() + 30);
    var dateString = date.toISOString().split("T")[0];

    const defaultValues = encodeDefaultFieldValues({
      Name: "My Opportunity",
      LeadSource: "My Offer",
      StageName: "Prospecting",
      Amount: 1000.0,
      CloseDate: dateString,
      AccountId: this.recordId
    });

    console.log(defaultValues);
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Opportunity",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    });
  }
}
