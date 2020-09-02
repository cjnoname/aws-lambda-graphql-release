import { Redis } from 'ioredis';
import { IConnection, ISubscriber, ISubscriptionManager, IdentifiedOperationRequest } from './types';
interface RedisSubscriptionManagerOptions {
    /**
     * IORedis client instance
     */
    redisClient: Redis;
}
/**
 * RedisSubscriptionManager
 *
 * Stores all subsrciption information in redis store
 *
 * Record types:
 *
 * subscription:
 *  key: `[app prefix]:subscription:[connectionId]:[operationId]:{[eventName]}` (where eventName is a keyslot)
 *  value: RedisSubscriber (this is always unique per client)
 *
 * subscriptionOperation:
 *  key: `[app prefix]:subscriptionOperation:[connectionId]:[operationId]`
 *  value: eventName
 *
 * connectionSubscriptionsList:
 *  key: `[app prefix]:connectionSubscriptionsList:[connectionId]`
 *  value: redis list of subscription keys corresponding to connectionId
 *
 * eventSubscriptionsList:
 *  key: `[app prefix]:eventSubscriptionsList:${eventName}`
 *  value: redis list of subscription keys corresponding to eventName
 */
export declare class RedisSubscriptionManager implements ISubscriptionManager {
    private redisClient;
    constructor({ redisClient }: RedisSubscriptionManagerOptions);
    subscribersByEventName: (name: string) => AsyncIterable<ISubscriber[]> & AsyncIterator<ISubscriber[]>;
    subscribe: (names: string[], connection: IConnection, operation: IdentifiedOperationRequest) => Promise<void>;
    unsubscribe: () => Promise<void>;
    unsubscribeOperation: (connectionId: string, operationId: string) => Promise<void>;
    unsubscribeAllByConnectionId: (connectionId: string) => Promise<void>;
    generateSubscriptionId: (connectionId: string, operationId: string) => string;
}
export {};
//# sourceMappingURL=RedisSubscriptionManager.d.ts.map