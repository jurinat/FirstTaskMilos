public with sharing class MyOfferController {

    @AuraEnabled(cacheable=true)
    public static List<MyOffer__c> getOffrs(String accountId){
        List<MyOffer__c> myOfferList=[SELECT Id,Name,Tag1__c,Tag2__c,Tag3__c,Tag4__c FROM MyOffer__c WHERE Account__c=:accountId];      
        return myOfferList;
    }
}
