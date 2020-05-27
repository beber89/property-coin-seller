#!/bin/bash
for i in {6..20}
do
   ../../zokrates compute-witness -a $i $((i*i))
   ../../zokrates generate-proof
   mv ./proof.json "./proofs/proof-$i.json"
done