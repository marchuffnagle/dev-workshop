/**
 * Flavoring: Flexible Nominal Typing for TypeScript
 *
 * https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing
 *
 * Flavoring works better when:
 *
 * - You want to allow implicit conversion of composite-structures which are from trusted sources, but want to use semantic subtypes for e.g. IDs to get type system support in downstream code
 *
 * - You wish to trace a category or source of a simple value, but aren’t willing to sign up for the friction of casting or using functions to “bless” values explicitly in all of your unit tests, etc. Units of measure are a good example.
 *
 * - You want to annotate the type of an argument with semantic information in a way that TypeScript can trace for you and make visible in e.g. editor tooltips while still using simple types at runtime.
 *
 * Branding works better when:
 *
 * - We want to write code that can safely assume some upstream validation has occurred–e.g. a DateStr which must be in a valid ISO8601 format.
 *
 * - A type error admitted by implicit conversion could lead to a dangerous error, such as when using types to access tokens to model authorization permissions.
 */

interface Flavoring<FlavorT> {
  _type?: FlavorT;
}

export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

type PersonId = Flavor<number, 'Person'>
type BlogPostId = Flavor<number, 'BlogPost'>

const personId: PersonId = 1;

// @ts-expect-error
const blogPostId: BlogPostId = personId;
