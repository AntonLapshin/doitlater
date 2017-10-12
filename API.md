## Constants

<dl>
<dt><a href="#runLater">runLater</a></dt>
<dd><p>Run Later: Ideally run smth when nothing happens</p>
</dd>
<dt><a href="#createDefer">createDefer</a> ⇒ <code>Defer</code></dt>
<dd><p>Defer implementation</p>
</dd>
<dt><a href="#waitFor">waitFor</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a promise from storage by name</p>
</dd>
<dt><a href="#add">add</a></dt>
<dd><p>Add a promise to storage</p>
</dd>
<dt><a href="#load">load</a> ⇒ <code>Promise</code></dt>
<dd><p>Load resource</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#addDefer">addDefer(name)</a></dt>
<dd><p>Add defer if it doesn&#39;t exist</p>
</dd>
</dl>

<a name="runLater"></a>

## runLater
Run Later: Ideally run smth when nothing happens

**Kind**: global constant  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="createDefer"></a>

## createDefer ⇒ <code>Defer</code>
Defer implementation

**Kind**: global constant  
<a name="waitFor"></a>

## waitFor ⇒ <code>Promise</code>
Get a promise from storage by name

**Kind**: global constant  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="add"></a>

## add
Add a promise to storage

**Kind**: global constant  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| promise | <code>Promise</code> | 

<a name="load"></a>

## load ⇒ <code>Promise</code>
Load resource

**Kind**: global constant  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| resources | <code>string</code> \| <code>function</code> \| <code>Array.&lt;(string\|function())&gt;</code> | 

<a name="addDefer"></a>

## addDefer(name)
Add defer if it doesn't exist

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

