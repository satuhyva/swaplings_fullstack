import { Model, QueryBuilder, Page, Validator } from 'objection'


class CustomQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {

    ArrayQueryBuilderType!: CustomQueryBuilder<M, M[]>
    SingleQueryBuilderType!: CustomQueryBuilder<M, M>
    MaybeSingleQueryBuilderType!: CustomQueryBuilder<M, M | undefined>
    NumberQueryBuilderType!: CustomQueryBuilder<M, number>
    PageQueryBuilderType!: CustomQueryBuilder<M, Page<M>>

    consoleLogInput(input: any): this {
        console.log('Logging from custom query builder, input: ', input)
        return this
    }
}


class CustomValidator extends Validator {
    validate(args: any) {
        // The model instance. May be empty at this point.
        const model = args.model
    
        // The properties to validate. After validation these values will
        // be merged into `model` by objection.
        const json = args.json
    
        // `ModelOptions` object. If your custom validator sets default
        // values, you need to check the `opt.patch` boolean. If it is true
        // we are validating a patch object and the defaults should not be set.
        const opt = args.options
    
        // A context object shared between the validation methods. A new
        // object is created for each validation operation. You can store
        // any data here.
        const ctx = args.ctx
    
        // Do your validation here and throw any exception if the
        // validation fails.
        //doSomeValidationAndThrowIfFails(json)
        console.log('Custom validating!!!')
    
        // You need to return the (possibly modified) json.
        return json
      }
}


export class Base extends Model {

    // static createValidator() {
    //     return new CustomValidator()
    // }

    // QueryBuilderType!: CustomQueryBuilder<this, this[]>;
    // static QueryBuilder = CustomQueryBuilder
    
}