import { DynamoDB } from 'aws-sdk';
import { IConnection, ISubscriber, ISubscriptionManager, IdentifiedOperationRequest } from './types';
interface DynamoDBSubscriptionManagerOptions {
    /**
     * Use this to override default document client (for example if you want to use local dynamodb)
     */
    dynamoDbClient?: DynamoDB.DocumentClient;
    /**
     * Subscriptions table name (default is Subscriptions)
     */
    subscriptionsTableName?: string;
    /**
     * Subscriptions operations table name (default is SubscriptionOperations)
     */
    subscriptionOperationsTableName?: string;
    /**
     * Optional TTL for subscriptions (stored in ttl field) in seconds
     *
     * Default value is 2 hours
     *
     * Set to false to turn off TTL
     */
    ttl?: number | false;
}
/**
 * DynamoDBSubscriptionManager
 *
 * Stores all subsrciptions in Subscriptions and SubscriptionOperations tables (both can be overridden)
 *
 * DynamoDB table structures
 *
 * Subscriptions:
 *  event: primary key (HASH)
 *  subscriptionId: range key (RANGE) - connectionId:operationId (this is always unique per client)
 *
 * SubscriptionOperations:
 *  subscriptionId: primary key (HASH) - connectionId:operationId (this is always unique per client)
 */
export declare class DynamoDBSubscriptionManager implements ISubscriptionManager {
    private subscriptionsTableName;
    private subscriptionOperationsTableName;
    private db;
    private ttl;
    constructor({ dynamoDbClient, subscriptionsTableName, subscriptionOperationsTableName, ttl, }?: DynamoDBSubscriptionManagerOptions);
    subscribersByEventName: (name: string) => AsyncIterable<ISubscriber[]> & AsyncIterator<ISubscriber[]>;
    subscribe: (names: string[], connection: IConnection, operation: IdentifiedOperationRequest) => Promise<void>;
    unsubscribe: (subscriber: ISubscriber) => Promise<void>;
    unsubscribeOperation: (connectionId: string, operationId: string) => Promise<void>;
    unsubscribeAllByConnectionId: (connectionId: string) => Promise<void>;
    generateSubscriptionId: (connectionId: string, operationId: string) => string;
}
export {};
//# sourceMappingURL=DynamoDBSubscriptionManager.d.ts.map