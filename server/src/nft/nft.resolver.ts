import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { NFTInput, NFTOutput } from './dtos/nft.dto';
import { NFTService } from './nft.service';

@Resolver()
export class NFTResolver {
  constructor(private readonly nftService: NFTService) {}

  @Query(() => String)
  hello(): string {
    return 'hello';
  }

  // issue NFT
  @Mutation(() => NFTOutput)
  cacheNFT(
    @Args() nftInput: NFTInput,
  ): // @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  Promise<NFTOutput> {
    return this.nftService.cacheNFT(nftInput);
  }
}
