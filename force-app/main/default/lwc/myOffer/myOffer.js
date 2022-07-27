import { LightningElement, wire, api, track } from "lwc";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { NavigationMixin } from "lightning/navigation";
import getOffrs from "@salesforce/apex/MyOfferController.getOffrs";
import getOffName from "@salesforce/apex/MyOfferController.getOffName";

export default class MyOffer extends NavigationMixin(LightningElement) {
  @api recordId;
  @api tabName;
  @api offrTagName;
  @track offer;
  @track offName;
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

  @wire(getOffName, { name: "$offrTagName" })
  wiredasf({ error, data }) {
    if (data) {
      this.offName = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.offName = undefined;
    }
  }

  clickedAll(){
    this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url: 'https://curious-impala-cypd70-dev-ed.lightning.force.com/lightning/o/MyOffer__c/list?filterName=00B7R00000B2KW8UAN'
        },
    });
  }

  clickOnOffer(event){
    event.currentTarget.dataset.id;
    window.location.assign('https://curious-impala-cypd70-dev-ed.lightning.force.com/lightning/r/MyOffer__c/'+newId+'/view');
  }

  navigateToNewContactWithDefaults() {
    var date = new Date();
    date.setDate(date.getDate() + 30);
    var dateString = date.toISOString().split("T")[0];

    const defaultValues = encodeDefaultFieldValues({
      Name: "My Opportunity",
      LeadSource: "My Offer",
      StageName: "Prospecting",
      Amount: 1000.00,
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
