import { ApexAPIBody, ApexAPIMessage, CamelActionKeys } from "./apex-api-message";
import { PascalCase } from "./helper-types";

/**
 * Factory class for creating Apex API messages.
 */
class ApexAPIMessageFactory {
    public createMessage<T extends CamelActionKeys>(key: T, data: ApexAPIBody<PascalCase<T>>, withAck: boolean = true): ApexAPIMessage {
        return {
            [key]: data,
            withAck
        } as unknown as ApexAPIMessage;
    }
}

/**
 * Instance of the ApexAPIMessageFactory for creating messages.
 */
export const ApexMessage = new ApexAPIMessageFactory();
