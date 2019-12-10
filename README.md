<a name="module_pleasure-swiss-army/Cli"></a>

## pleasure-swiss-army/Cli
Set of utilities for cli applications


* [pleasure-swiss-army/Cli](#module_pleasure-swiss-army/Cli)
    * [~obj2ArgsArray(obj)](#module_pleasure-swiss-army/Cli..obj2ArgsArray) ⇒ <code>Array</code>
    * [~exec(command, [args], cwd, env, env, [progress])](#module_pleasure-swiss-army/Cli..exec) ⇒ [<code>Promise.&lt;ExecResult&gt;</code>](#module_pleasure-swiss-army/Cli..ExecResult)
    * [~ExecResult](#module_pleasure-swiss-army/Cli..ExecResult) : <code>Object</code>

<a name="module_pleasure-swiss-army/Cli..obj2ArgsArray"></a>

### pleasure-swiss-army/Cli~obj2ArgsArray(obj) ⇒ <code>Array</code>
Converts given object into an array of arguments

**Kind**: inner method of [<code>pleasure-swiss-army/Cli</code>](#module_pleasure-swiss-army/Cli)  
**Returns**: <code>Array</code> - Arguments array  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

**Example**  
```js
const args = {
  noLockfile: true,
  ignoreEngines: false,
  json: true
}

obj2ArgsArray(args)
// outputs: ['--no-lockfile', '--json']
```
<a name="module_pleasure-swiss-army/Cli..exec"></a>

### pleasure-swiss-army/Cli~exec(command, [args], cwd, env, env, [progress]) ⇒ [<code>Promise.&lt;ExecResult&gt;</code>](#module_pleasure-swiss-army/Cli..ExecResult)
Uses an spawn process to execute given command

**Kind**: inner method of [<code>pleasure-swiss-army/Cli</code>](#module_pleasure-swiss-army/Cli)  
**Returns**: [<code>Promise.&lt;ExecResult&gt;</code>](#module_pleasure-swiss-army/Cli..ExecResult) - The child process output  
**Throws**:

- <code>Error</code> stderr output if any


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>String</code> |  | The command to execute |
| [args] | <code>Object</code> |  | Object to be converted as terminal kind of parameters using `obj2ArgsArray` |
| cwd | <code>String</code> | <code>process.cwd()</code> | Object to pass as the env of the child process |
| env | <code>Object</code> | <code>process.env</code> | Object to pass as the env of the child process |
| env | <code>Object</code> | <code>process.env</code> | Object to pass as the env of the child process |
| [progress] | <code>function</code> |  | Callback function that receives the progress of the operation |

<a name="module_pleasure-swiss-army/Cli..ExecResult"></a>

### pleasure-swiss-army/Cli~ExecResult : <code>Object</code>
**Kind**: inner typedef of [<code>pleasure-swiss-army/Cli</code>](#module_pleasure-swiss-army/Cli)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>String</code> | Resulted output from stdout |
| errors | <code>String</code> | Any errors received via stderr |


* * *

&copy; 2019 Martin Rafael <tin@devtin.io>
